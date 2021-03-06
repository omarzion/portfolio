const webpack = require('webpack');
const webpackBase = require('./webpack.base.server');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = { ...webpackBase, ...{
  mode: 'development',
  entry: webpackBase.entry.concat('webpack/hot/poll?1000'),
  watch: true,
  externals: [
    nodeExternals({ whitelist: ['webpack/hot/poll?1000']})
  ],
  plugins: webpackBase.plugins.concat(
    new webpack.WatchIgnorePlugin([/s?(a|c)ss\.d\.ts$/]),
    new webpack.HotModuleReplacementPlugin(),
    new StartServerPlugin('server.js')
  )
}};