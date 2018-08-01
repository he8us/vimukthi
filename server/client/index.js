// @flow
import webpack from "webpack";
import type {Middleware} from "express";
import express from "express";
import debug from "debug";
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {name} from "../../package";
import webpackConfig, {BUILD_PATH} from '../../webpack.config.babel';

const log = debug(`${name}:client:generate`);
const devServerLogger = debug(`${name}:client:server`);

export const serve = (): Promise<Middleware> => {
    return new Promise((resolve: Function, reject: Function): void => {
        const config = webpackConfig();

        if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') {
            devServerLogger('Creating compiler server');
            const compiler = webpack(config);
            resolve([
                webpackDevMiddleware(compiler, {
                    ...config.devServer,
                    reporter: (middlewareOptions, options) => {
                        const {log, state, stats} = options;
                        if (state) {
                            let message = 'Compiled successfully.';

                            if (stats.hasErrors()) {
                                message = 'Failed to compile.';
                            } else if (stats.hasWarnings()) {
                                message = 'Compiled with warnings.';
                            }

                            if (stats.hasErrors()) {
                                log.error(stats.toString(middlewareOptions.stats));
                            } else if (stats.hasWarnings()) {
                                log.warn(stats.toString(middlewareOptions.stats));
                            }

                            devServerLogger(message);
                            return;
                        }

                        devServerLogger('Compiling...');
                    },
                    writeToDisk: (filePath: string) => {
                        return /index\.html$/.test(filePath);
                    }
                }),
                webpackHotMiddleware(compiler)
            ]);
            return;
        }


        log('Generating client assets');
        webpack(config, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }

            if (stats.hasErrors()) {
                reject(stats.toString());
                return;
            }
            log("Client assets generated");
            resolve(express.static(BUILD_PATH));
        });

    });
};
