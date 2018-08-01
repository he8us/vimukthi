// @flow
export class Exception extends Error {
    static WARNING: string = "WARNING";

    static ERROR: string = "ERROR";

    name: string;
    level: typeof Exception.WARNING | typeof Exception.ERROR;

    constructor(message: string, level: $PropertyType<Exception, 'level'> = Exception.ERROR) {
        super(message);
        this.name = "Exception";
        this.level = level;
    }
}
