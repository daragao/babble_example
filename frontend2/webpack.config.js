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
        loaders: [
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader' },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: [
                { loader: "style-loader", options: { sourceMap: true } },
                { loader: 'resolve-url-loader' },
                { loader: "css-loader", options: { sourceMap: true } }
            ], exclude: /node_modules/ },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: "css-loader", options: { sourceMap: true } },
                        { loader: 'resolve-url-loader' },
                        { loader: "sass-loader", options: { sourceMap: true } }]
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        HtmlWebpackPluginConfig,
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
    ]
}
