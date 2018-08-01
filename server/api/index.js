// @flow
import debug from 'debug';
import path from 'path';
import SwaggerMiddleware from "./SwaggerMiddleware";
import type {$Application} from 'express';
import {name} from '../../package';

const log = debug(`${name}:api`);

const swaggerConfig = {
    appRoot: path.resolve()
};


export const configure = (app: $Application): Promise<$Application> => {
    log('Registering API');
    return new Promise((resolve: Function) => {
        SwaggerMiddleware(swaggerConfig, (err, middleware) => {
            if (err) {
                throw err;
            }
            middleware.register(app);
            log("Registered api");
            resolve(app);
        });
    });
};
