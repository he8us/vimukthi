// @flow
export const entries = function* (obj: Object): Generator<[string, any], void, void> {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    };
export const props = function* (obj: Object): Generator<string, void, void> {
    for (let key of Object.keys(obj)) {
        if (typeof obj[key] !== 'function') {
            yield key;
        }
    }
};

export const values = function* (obj: Object): Generator<any, void, void> {
    for (let key of Object.keys(obj)) {
        yield obj[key];
    }
};
