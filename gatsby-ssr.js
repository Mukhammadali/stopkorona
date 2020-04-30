/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react'
// import Layout from "./src/components/Layout"


// You can delete this file if you're not using it
export { default as wrapRootElement } from 'src/components/ProvidersWrapper';
export { default as wrapPageElement } from 'src/components/i18nProviderWrapper';
// import React from "react"
// import i18n from "./src/translation/i18n"
// import createStore from "./src/state/createStore"
// export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
//   i18n.loadNamespaces(["common"], () => {
//     replaceBodyHTMLString(bodyComponent)
//   })
// }

// export const wrapPageElement = ({ element, props }) => {
//   // props provide same data to Layout as Page element will get
//   // including location, data, etc - you don't need to pass it
//   return <Layout {...props}>{element}</Layout>
// }