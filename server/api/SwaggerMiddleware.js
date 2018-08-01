// @flow
import SwaggerRunner from 'swagger-node-runner';
import debug from 'debug';
import {name} from '../../package';
import type {$Request} from "express";

const log = debug(`${name}:swagger:middleware`);

export type SwaggerRequest = $Request & { swagger: Object }

export default (config: Object, cback: Function = () => {
}) => {
    SwaggerRunner.create(config, function (err, runner) {
        if (err) {
            cback(err);
        }

        log('Initialized middleware');
        cback(undefined, runner.expressMiddleware());
    });
};

