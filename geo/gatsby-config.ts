/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: `/geo`,
  siteMetadata: {
    title: `geo | geospatial node management`,
    description: `geospatial node management.`,
    author: `@choraio`,
    siteUrl: `https://chora.io/geo`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chora`,
        short_name: `Chora`,
        start_url: `/`,
        background_color: `#000`,
        display: `standalone`,
        icon: `src/assets/images/favicon.ico`,
      },
    },
  ],
}
