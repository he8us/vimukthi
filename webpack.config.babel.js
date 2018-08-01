import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import config from 'config';

export const BUILD_PATH = path.resolve(config.get('server.buildPath'), 'assets');


export default () => {
    const ENV = process.env.NODE_ENV || "development";
    let cfg = {
        devtool: ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
        entry: [
            'babel-polyfill',
            'webpack-hot-middleware/client',
            './client/index.js'
        ],
        mode: ENV,
        output: {
            filename: ENV === "production" ? 'bundle-[hash].js' : 'bundle.js',
            publicPath: config.get('server.publicPath'),
            path: BUILD_PATH
        },
        devServer: {
            publicPath: config.get('server.publicPath'),
            hot: true
        },
        module: {
            rules: [{
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                        },
                    },
                    // Process JS with Babel.
                    {
                        test: /\.js|jsx?$/,
                        loader: require.resolve('babel-loader'),
                        options: {

                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true,
                        },
                    },

                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                                options: {
                                    sourceMap: true
                                },
                            },
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    sourceMap: true,
                                    importLoaders: 1,
                                },
                            },
                        ]
                    }
                ]
            }]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(BUILD_PATH, {
                verbose: false
            }),
            new HtmlWebpackPlugin({
                title: "ToDo UI",
                template: path.resolve('client/index.html'),
                minify: {
                    html5: true,
                    removeComments: ENV === "production",
                    collapseWhitespace: ENV === "production",
                    preserveLineBreaks: true,
                    decodeEntities: true,
                },
            }),
            new MiniCssExtractPlugin({
                filename: '[name]-[contenthash].css',
                chunkFilename: "[id]-[contenthash].css"
            })
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    };


    return cfg;

};
