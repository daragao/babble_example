const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
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
];
