import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink, navigate as gatsbyNavigate } from "gatsby"
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

const Link = ({ to, children, onClick, ...rest }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const link = language === 'uz' ? to : `/${language}${to}`

  const handleClick = e => {
    if (language) {
      localStorage.setItem("stopkorona_uz_locale", language)
    }
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <GatsbyLink {...rest} to={link.replace(/\/$/, "")} onClick={handleClick}>
      {children}
    </GatsbyLink>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  language: PropTypes.string,
}

Link.defaultProps = {
  to: "",
}

export default Link

const getPath = (language, path) => {
  if(language === 'uz'){
    return path;
  }
  return `/${language}${path}`
}

export const navigate = (to, options) => {
  if (typeof window === "undefined") {
    return
  }

  const language = window.___siteLanguage
 
  const link = getPath(language, to);
  //  routed ? `/${language}${to}` : `${to}`
  gatsbyNavigate(link, options)
}

export const changeLocale = (language, to) => {
  if (typeof window === "undefined") {
    return
  }
  const currentLang = window.___siteLanguage

  const removeLocalePart = pathname => {
    if (!pathname || currentLang === 'uz') {
      return pathname
    }
    const i = pathname.indexOf(`/`, 1)
    return pathname.substring(i)
  }

  const removePrefix = (pathname) => {
    const locale = pathname.split
    // if(pathname )
  }

  const pathname = removeLocalePart(window.location.pathname)
  // TODO: check slash
  let link = `/${language}${pathname}${window.location.search}`
  if(language === 'uz'){
    link = `${pathname}${window.location.search}`
  }
  localStorage.setItem("stopkorona_uz_locale", language)
  gatsbyNavigate(link.replace(/\/$/, ""))
}