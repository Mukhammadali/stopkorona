import React, { useEffect } from "react"
import i18next from "i18next"
import * as ReactI18next from "react-i18next"
import { Helmet } from "react-helmet"
import { changeLocale, navigate } from 'src/lib/utils/i18n'

export const AlternateLinksContext = React.createContext([])

function i18nProviderWrapper({ element, props }) {
  console.log('props:', props)
  const i18n = i18next
    .createInstance({
      lng: props.pageContext.language,
      interpolation: { escapeValue: false },
      initImmediate: false,
      ns: "translation",
      resources: props.pageContext.i18nResources,
    })
    .use(ReactI18next.initReactI18next)
  i18n.init()
  if (typeof window !== `undefined`) {
    window.___siteLanguage = props.pageContext.language;
    const language = localStorage.getItem('stopkorona_uz_locale');
    console.log('language:', language)
    if(language && language !== props.pageContext.language){
      changeLocale(language);
    }
  }
  return (
    <ReactI18next.I18nextProvider i18n={i18n}>
      <AlternateLinksContext.Provider
        value={props.pageContext && props.pageContext.alternateLinks}
      >
        {
          <Helmet htmlAttributes={{ lang: props.pageContext.language }}>
            {props.pageContext &&
              props.pageContext.alternateLinks &&
              props.pageContext.alternateLinks.map(link => (
                <link
                  rel="alternate"
                  hrefLang={link.language}
                  href={link.path}
                  key={link.path}
                />
              ))}
          </Helmet>
        }
        {element}
      </AlternateLinksContext.Provider>
    </ReactI18next.I18nextProvider>
  )
}

export default i18nProviderWrapper;