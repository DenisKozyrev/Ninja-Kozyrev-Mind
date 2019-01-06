'use strict'

const Webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, args) => {
    const base = {
        output: {
            path: __dirname + '/dist',
            filename: 'js/[name]_[hash].js'
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Ninja-Kozyrev-Mind',
                filename: 'index.html',
                template: './src/landing/landing.html',
            }),
            new HtmlWebpackPlugin({
                title: 'Ninja-Kozyrev-Mind',
                filename: 'game.html',
                template: './src/game.html',
            }),
            new MiniCssExtractPlugin({
                filename: '[name]_[hash].css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|jpg)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img/[name].[ext]',
                        }
                    }]
                },
                {
                    test: /\.(mp3)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'assets/audio/[name].[ext]',
                        }
                    }]
                },
                {
                    test: /\.(ttf)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'assets/fonts/[name].[ext]',
                        }
                    }]
                }
            ]
        }
    };

    const dev = {
        entry: [
            'webpack-dev-server/client?http://localhost:3000',
            './src/index'
        ],
        devtool: 'source-map',
        devServer: {
            contentBase: './dist',
            port: 3000,
            open: true,
            hot: true,
            inline: true
        },
        plugins: [
            new Webpack.HotModuleReplacementPlugin()
        ]
    };

    const prod = {
        entry: [
            './src/index'
        ],
        plugins: [
            new UglifyJSPlugin()
        ]
    };

    let config = {};

    if (args.mode === 'development') {
        config = merge(base, dev);
    }
    else {
        config = merge(base, prod);
    }

    return config;
};
