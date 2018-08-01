// @flow
import path from 'path';
import debug from 'debug';
import chalk from 'chalk';
import type {$Request, $Response, Middleware} from "express";
import express from 'express';
import lodashExpress from 'lodash-express';
import {name} from '../package';
import config from 'config';
import {serve as serveClient} from './client';
import {serve as serveApiDocumentation, template as apiDocumentationTemplate} from './api-doc';
import {serve as serveApiEditor, template as apiEditorTemplate} from './api-editor';
import {configure as configureApi} from './api';

const log = debug(`${name}:server`);

let preloads: Array<Promise<any>> = [];
export const app = express();
lodashExpress(app, 'html');
app.set('view engine', 'html');


config.get('services.api-doc') && preloads.push(
    serveApiDocumentation().then((path: string) => {
        app.use("/api/doc/assets", express.static(path));
        app.get("/api/doc", (req: $Request, res: $Response) => {
            res.render(apiDocumentationTemplate, {
                apiurl: '/api',
                rootPath: '/api/doc'
            });
        });
        log(`Mapped /api/doc to ${path}`);
    })
);


config.get('services.api-editor') && preloads.push(
    serveApiEditor().then((path: string) => {
        app.use("/api/editor/assets", express.static(path));
        app.get("/api/editor", (req: $Request, res: $Response) => {
            res.render(apiEditorTemplate, {
                rootPath: '/api/editor'
            });
        });
        log(`Mapped /api/editor to ${path}`);
    })
);


config.get('services.client') && preloads.push(
    serveClient().then((middleware: Middleware): void => {
        log('Loaded client middleware');
        if (process.env.NODE_ENV === 'production') {
            log(`Mapped ${config.server.publicPath}`);
            app.use(config.server.publicPath, middleware);
            return;
        }
        app.use(middleware);
    })
);


config.get('services.api') && preloads.push(
    configureApi(app)
);

app.get('/', (req: $Request, res: $Response): void => {
    res.sendFile(path.resolve(process.cwd(), config.get('server.buildPath'), 'assets/index.html'));
});

Promise.all(preloads)
    .then(() => {
        log('Preloading done');
        app.listen(config.get('server.port'), function (): void {
            let host = `http://localhost:${this.address().port}`;
            let msgs = [chalk.green('App Started')];
            config.get('services.client') && msgs.push(`   - Client available at ${chalk.blue(host + '/')}`);
            config.get('services.api-doc') && msgs.push(`   - Api documentation available at ${chalk.green(host + '/api/doc/')}`);
            config.get('services.api') && msgs.push(`   - Api available at ${chalk.yellow(host + '/api/')}`);
            config.get('services.api-editor') && msgs.push(`   - Api editor available at ${chalk.magenta(host + '/api/editor/')}`);
            console.log(msgs.join('\n'));
        });
    })
    .catch((err) => {
        log("Preloading failed: %s", err);
        console.error(err);
        process.exit(1);
    });
