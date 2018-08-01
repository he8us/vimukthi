// @flow
import path from 'path';
import tar from 'tar';
import debug from 'debug';
import {name} from '../../package';

const log = debug(`${name}:packager`);


export const run = (name: string = "js-candidate-test-result"): void => {
    log(`Start packaging ${path.resolve(process.cwd()).toString()}`);

    tar.c(
        {
            gzip: true,
            file: `${name}.tar.gz`,
            filter: (path: string) => {

                let result = !/node_modules/.test(path)
                    && !/\/build\//.test(path)
                    && !/flow-typed/.test(path)
                    && !/.git/.test(path)
                    && !/.idea/.test(path)
                    && !/\.log$/.test(path)
                    && !/\.tar\.gz$/.test(path);

                if (result) log(`Will compress ${path}`);

                return result;
            }
        },
        [process.cwd()]
    ).then((): void => {
        log(`Packaged ${path.resolve(process.cwd()).toString()}`);
    });
};
