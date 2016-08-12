/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
var _ = require('lodash');

var devConfig = require('./webpack.config.js');

module.exports = _.extend(devConfig, {
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
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
