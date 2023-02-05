/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `chora | decentralized protocol research`,
    description: `Decentralized protocol research and development.`,
    author: `@choraio`,
    siteUrl: `https://chora.io/`,
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
