const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: "ts-loader"}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.ejs'}),
    new CleanWebpackPlugin(['dist'])
  ]
};
