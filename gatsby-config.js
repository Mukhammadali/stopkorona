module.exports = {
  siteMetadata: {
    title: `stopkorona.uz`,
    description: `Koronavirusga oid so'ngi statistika va ma'lumotlar`,
    author: `@mukhammadali`,
    siteUrl: `https://stopkorona.uz`,
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-zeit-now',
    'gatsby-plugin-sitemap',
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
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `stopkorona.uz`,
        short_name: `Stopkorona`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/static/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // {
    //   resolve: "gatsby-source-custom-api",
    //   options: {
    //     url: "https://corona.lmao.ninja/v2/countries/Uzbekistan?yesterday=true",
    //     rootKey: 'total'
    //   },
    // },
    // {
    //   resolve: "gatsby-source-custom-api",
    //   options: {
    //     url: "https://corona.lmao.ninja/v2/historical/Uzbekistan?lastdays=all",
    //     rootKey: 'historical'
    //   }
    // }
    // 'source_rest',
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [],
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
