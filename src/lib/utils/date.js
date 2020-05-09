import { format, fromUnixTime } from 'date-fns'
import {enGB, uz, ru} from 'date-fns/esm/locale'

const locales = {en: enGB, uz, ru}

const getCurrentLocale = () => locales[window.___siteLanguage || 'en'];
export const formatUnixTime = (unixTime, formatStr, middleware= d => d) => {
  return format(middleware(fromUnixTime(parseInt(unixTime, 10))), formatStr, {
    locale: getCurrentLocale()
  });
}

export const formatDate = (date, formatStr) => format(date, formatStr, {
  locale: getCurrentLocale()
})