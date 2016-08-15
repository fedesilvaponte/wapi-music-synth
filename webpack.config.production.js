/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

var devConfig = require('./webpack.config.js');

module.exports = _.extend(devConfig, {
    plugins: [
      new ProgressBarPlugin(),
      new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
          }
      }),
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'src/index.html'
      })
    ],
    devtool: 'source-map',
    entry: './src/index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './'
    }
});
