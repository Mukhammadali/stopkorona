/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
// const axios = require('axios');

// const axiosInstance = axios.create({
//   baseURL: 'https://corona.lmao.ninja'
// })

// const fetchUzbekistan = () =>
//   axiosInstance.get(`/countries/Uzbekistan`);
// const fetchUzbekistanHistorical = () =>
//   axiosInstance.get(`/v2/historical/Uzbekistan?lastdays=all`);

// exports.onCreatePage = async ({ page, actions: { createPage, deletePage } }) => {
//   console.log('page:', page)
//   const response = await fetchUzbekistanHistorical()
//   // const uzbekistanTemplate = require.resolve("src/templates/Uzbekistan/index.js");
//     // createPage({
//     //   // path: ``,
//     //   // path: '/',
//     //   // component: uzbekistanTemplate,
//     //   ...page,
//     //   context: {
//     //     title: 'hey there'
//     //   },
//     // })
//     // const uzbekistanTemplate = require.resolve("./src/templates/Uzbekistan/index.js");
//     if(response.data) {
//       deletePage(page);
//       createPage({
//         ...page,
//         context: response.data,
//       })
//     }
// }
// exports.createPages = async ({ actions: { createPage } }) => {
//   const response = await fetchUzbekistan()
//   const uzbekistanTemplate = require.resolve("./src/templates/Uzbekistan/index.js");
//   if(response.data) {
//     createPage({
//       path: '/',
//       component: uzbekistanTemplate,
//       context: {
//         title: 'hey there'
//       },
//     })
//   }
// }


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname), "node_modules"],
    },
  })
}