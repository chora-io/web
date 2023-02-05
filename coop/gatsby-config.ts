/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: `/coop`,
  siteMetadata: {
    title: `coop | chora cooperative`,
    description: `chora cooperative`,
    author: `@choraio`,
    siteUrl: `https://chora.io/coop`,
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
        icon: `node_modules/chora/assets/images/favicon.ico`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `node_modules/chora/assets/images`,
      },
    },
  ],
}
