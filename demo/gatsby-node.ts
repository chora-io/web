// TODO: ideally these warnings do not exist but ok to turn off with css modules
exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()
  const miniCssExtractPlugin = config.plugins.find(
    plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
  )
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.ignoreOrder = true
  }
  actions.replaceWebpackConfig(config)
}
