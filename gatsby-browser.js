/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'flag-icon-css/css/flag-icon.min.css'
import 'src/static/fonts/fonts.css';
import "src/style/global.css"

// You can delete this file if you're not using it
export { default as wrapRootElement } from 'src/components/ProvidersWrapper';
export { default as wrapPageElement } from 'src/components/i18nProviderWrapper';

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Dasturning yangi versiyasi topildi. ` +
      `Yangilashni xoxlaysizmi?`
  )
  if (answer === true) {
    window.location.reload()
  }
}