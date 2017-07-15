const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const publicPath = 'static/dist/';
const appPath = path.resolve(__dirname, './app/static/app');
const distPath = path.resolve(__dirname, './app/static/dist');

// TODO(lnw) hot module loading with webpack-dev-server

const webpackConfig = {
    entry: {
        'app': path.resolve(appPath, 'app.js'),
        'dependencies': path.resolve(appPath, 'dependencies.js')
    },
    plugins: [
        new cleanWebpackPlugin([distPath]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'dependencies'
        }),
        new htmlWebpackPlugin({
            template: path.resolve(appPath, 'index.ejs'),
            inject: 'body'
        })
    ],
    devtool: process.env.NODE_ENV ? '' : 'cheap-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ng-annotate-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ],
            },
            {
                test: /\.html$/,
                use: ['ng-cache-loader?prefix=[dir]/[dir]']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: 'images/[name].[ext]' }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: 'fonts/[name].[ext]' }
                }]
            }
        ]
    },
    output: {
        filename: process.env.NODE_ENV ? '[name].[chunkhash].js' : '[name].js',
        path: path.resolve(__dirname, distPath),
        publicPath: publicPath
    },
    watchOptions: {
        poll: 500
    },
}

module.exports = webpackConfig;