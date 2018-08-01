// @flow
import path from "path";
import debug from "debug";
import {name} from '../../package';

const log = debug(`${name}:api-doc:server`);

export const serve = (): Promise<string> => {
    return new Promise((resolve: Function): void => {
        log("Serve Api Documentation files");
        resolve(path.dirname(require.resolve('swagger-ui-dist/package.json')));
    });
};

export const template = path.resolve(__dirname, "./index.html");
