const loaders = require('./webpack.loaders.js');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src', 'sass'],
    },
    devtool: "source-map", // any "source-map"-like devtool is possible
    module: {
        loaders: loaders
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        HtmlWebpackPluginConfig,
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
        //new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production") } }),
        //new webpack.optimize.UglifyJsPlugin({ compress:{ warnings: true } }),
    ]
}
