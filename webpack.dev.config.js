var webpack = require('webpack');
var path = require('path');
var commonConfig = require('./webpack.common.config');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('style.css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var output = {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
};

module.exports = Object.assign(commonConfig, {
    output: output,
    devtool: 'eval-source-map',
    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'js/app.js')
    ],
    module: {
        loaders: commonConfig.module.loaders.concat({
            test: /\.s?css$/,
            exclude: /(node_modules)/,
            loader: extractCSS.extract('style', 'css?sourceMap!postcss?sourceMap!sass?sourceMap')
        })
    },
    plugins: [
        extractCSS,
        new HtmlWebpackPlugin({
          template: 'index.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new CopyWebpackPlugin([
          {from:'images', to:'images'}
        ]),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
    ]
});
