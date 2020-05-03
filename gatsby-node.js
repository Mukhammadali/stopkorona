const path = require('path');
const fs = require("fs-extra")
const i18next = require("i18next")
const nodeFsBackend = require("i18next-node-fs-backend")
// const LanguageDetector = require("i18next-browser-languagedetector")


const allLanguages = ["en", "uz", "ru", "kz"]
const defaultLanguage = 'uz';
const templateNames = [
  'home',
  'global',
  'countries'
]

const generatePath = (path, language) => {
  if (language === defaultLanguage) {
    if(path === 'home'){
      return '/';
    }
    return `/${path}`
  }
  if(path === 'home'){
    return `/${language}`;
  }
  return `/${language}/${path}`
}

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const srcPath = resolveApp("src")

exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
  try {
  const allTemplates = [];
  for(let templateName of templateNames){
    const component = path.resolve(`./src/templates/${templateName}.js`);
    if(component) {
      allTemplates.push({
        name: templateName,
        component
      });
    }
  }
  // const homeTemplate = path.resolve(`./src/templates/home.js`)
  // const globalTemplate = path.resolve(`./src/templates/global.js`)
  // const countriesTemplate = path.resolve(`./src/templates/countries.js`)
  allTemplates.map(async template => {
    await buildI18nPages(
      null,
      (_, language) => ({
        path: generatePath(template.name, language), // (1)
        component: template.component,
        context: {},
      }),
      ["common", "home"],
      createPage
    )
  })
  // await buildI18nPages(
  //   null,
  //   (_, language) => ({
  //     path: `/${language}/global`, // (1)
  //     component: globalTemplate,
  //     context: {},
  //   }),
  //   ["common", "global"],
  //   createPage
  // )
  
  // await buildI18nPages(
  //   null,
  //   (_, language) => ({
  //     path: `/${language}/countries`, // (1)
  //     component: countriesTemplate,
  //     context: {},
  //   }),
  //   ["common", "countries"],
  //   createPage
  // )

  await build404Pages(createPage)

  // createRedirect({ fromPath: "/", toPath: "/en", isPermanent: true })

  allLanguages.forEach(language =>
    createRedirect({
      fromPath: `/${language}/*`,
      toPath: `/${language}/404`,
      statusCode: 404,
    })
  )
  createRedirect({ fromPath: "/*", toPath: "/404", statusCode: 404 })
      
} catch (err) {
  console.log('BUILD ERROR', err)
}
}

const buildI18nPages = async (
  inputData,
  pageDefinitionCallback,
  namespaces,
  createPage
) => {
  if (!Array.isArray(inputData)) inputData = [inputData]
  await Promise.all(
    inputData.map(async ipt => {
      const definitions = await Promise.all(
        allLanguages.map(async language => {
          const i18n = await createI18nextInstance(language, namespaces) // (1)
          const res = pageDefinitionCallback(ipt, language, i18n) // (2)
          res.context.language = language
          res.context.i18nResources = i18n.services.resourceStore.data // (3)
          return res
        })
      )

      const alternateLinks = definitions.map(d => ({
        language: d.context.language,
        path: d.path,
      }))

      definitions.forEach(d => {
        d.context.alternateLinks = alternateLinks
        createPage(d);
      })
    })
  )
}

const createI18nextInstance = async (language, namespaces) => {
  const i18n = i18next.createInstance()
  i18n.use(nodeFsBackend)
  await new Promise(resolve =>
    i18n.init(
      {
        lng: language,
        ns: namespaces,
        fallbackLng: language,
        interpolation: { escapeValue: false },
        backend: { loadPath: `${srcPath}/translation/locales/{{lng}}.json` },
      },
      resolve
    )
  )
  return i18n
}

const build404Pages = async createPage => {
  const errorTemplate = path.resolve(`./src/templates/404.js`)
  await Promise.all(
    allLanguages.map(async (language, index) => {
      const i18n = await createI18nextInstance(language, ["common", 404])
      const res = {
        path: "/" + language + "/404",
        component: errorTemplate,
        context: {},
      }
      res.context.language = language
      res.context.i18nResources = i18n.services.resourceStore.data
      createPage(res)
      if (index === 0) {
        res.path = "/404"
        createPage(res)
      }
    })
  )
}

// exports.onPostBuild = () => {
//   console.log("Copying locales")
//   fs.copySync(
//     path.join(__dirname, "/src/translation/locales"),
//     path.join(__dirname, "/public/locales")
//   )
// }

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions
//   // Only update the `/app` page.
//   if (page.path.match(/\/countries/)) {
//     const splittedPage = page.path.split('/countries')
//     // page.matchPath is a special key that's used for matching pages
//     // with corresponding routes only on the client.
//     if(splittedPage.length === 2){
//       page.matchPath = splittedPage[0] + "/countries/*"
//     } else {
//       page.matchPath = "/countries/*"
//     }
//     // Update the page.
//     console.log('page:', page)
//     createPage(page)
//   }
// }

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname), "node_modules"],
    },
  })
}