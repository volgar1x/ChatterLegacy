var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + "/src",
  entry: [
    './index',
  ],
  output: {
    path: __dirname + "/_build",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
};
