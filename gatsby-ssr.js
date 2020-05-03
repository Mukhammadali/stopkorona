/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react'

export { default as wrapRootElement } from 'src/components/ProvidersWrapper';
export { default as wrapPageElement } from 'src/components/i18nProviderWrapper';
