// @flow
import type {$Application} from "express";
import express from 'express';
import SwaggerMiddleware from '../../server/api/SwaggerMiddleware';
import path from "path";
import config from 'config';
import type {Server} from "@types/node";

const app: $Application = express();


const swaggerConfig = {
    appRoot: path.resolve()
};

const serverPort: number = (config.get('server.port'): number);
const server: Server = (app.listen(serverPort): Server);

export default server;

SwaggerMiddleware(swaggerConfig, function (err, middleware) {
    if (err) {
        throw err;
    }
    middleware.register(app);
});

after(() => {
    server.close();
});
