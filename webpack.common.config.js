var ProvidePlugin = require('webpack').ProvidePlugin;
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './js/app.js'
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }, {
          test: /\.html$/,
          loader: "html-loader"
        }, {
            test: /\.tpl$/,
            loader: 'lodash-tpl-loader'
        }, {
            test: /\.vert$/,
            loader: 'webpack-glsl-loader'
        }, {
            test: /\.frag$/,
            loader: 'webpack-glsl-loader'
        }, {
            test: /\.(jpe?g|png|gif)$/,
            exclude: /(node_modules)/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },
    postcss: function() {
        return [autoprefixer];
    },
    plugins: []
};
