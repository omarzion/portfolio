const webpack = require('webpack');
const webpackBase = require('./webpack.base.client');
const port = +require('./envLoader')()['ENV.PORT'].replace(/\"/g, ""); // Load port from environment and coerce it into int

module.exports = { ...webpackBase, ...{
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port+1}`,
    'webpack/hot/only-dev-server',
    webpackBase.entry.main,
  ],
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: port+1,
    historyApiFallback: true,
    stats: { children: false },
    hot: true,
    proxy: {
      "*": `http://localhost:${port}`
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  output: {
    pathinfo: true,
    path: webpackBase.output.path,
    filename: webpackBase.output.filename,
    publicPath: `http://localhost:${port+1}/`
  },
  plugins: webpackBase.plugins.concat([
    new webpack.WatchIgnorePlugin([/s?(a|c)ss\.d\.ts$/]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ])
}};