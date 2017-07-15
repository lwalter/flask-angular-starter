const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const appPath = path.resolve(__dirname, './app/static/app');
const distPath = path.resolve(__dirname, './app/static/dist');

// TODO(lnw) hot module loading

module.exports = {
    entry: {
        'app': path.resolve(appPath, 'app.js'),
        'dependencies': path.resolve(appPath, 'dependencies.js')
    },
    plugins: [
        new cleanWebpackPlugin([distPath]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'dependencies'
        })
    ],
    devtool: "cheap-eval-source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                use: [
                    'ng-annotate',
                    'babel'
                ]
            }
        ],
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    // TODO(lnw): prod builds => uglify, use chunkhash for cache busting
    output: {
        filename: process.env.NODE_ENV ? '[name].[chunkhash].js' : '[name].js',
        path: path.resolve(__dirname, distPath)
    }
}