module.exports = {
  siteMetadata: {
    title: `stopkorona.uz`,
    description: `Koronavirusga oid so'ngi statistika va ma'lumotlar`,
    author: `@mukhammadali`,
    siteUrl: `https://stopkorona.uz`,
  },
  plugins: [
    'gatsby-plugin-zeit-now',
    'gatsby-plugin-sitemap',
    // `gatsby-plugin-transition-link`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/ // See below to configure properly
        }
      }
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-159324585-2",
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/countries/*`] },
    },
    
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/locales`,
        // supported language
        languages: [`en`, `uz`, `ru`],
        // language file path
        defaultLanguage: `uz`,
        // option to redirect to `/ko` when connecting `/`
        redirect: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `StopKorona`,
        short_name: `StopKorona`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/static/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: ['/', '/global', '/countries'],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
