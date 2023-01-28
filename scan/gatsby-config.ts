/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: `/scan`,
  siteMetadata: {
    title: `scan | network scanner`,
    description: `chora network scanner`,
    author: `@choraio`,
    siteUrl: `https://chora.io/scan`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chora`,
        short_name: `Chora`,
        start_url: `/`,
        background_color: `#000`,
        display: `standalone`,
        icon: `${__dirname}/node_modules/chora/assets/images/favicon.ico`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/node_modules/chora/assets/images`,
      },
    },
  ],
}
