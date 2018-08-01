// Prevent Mocha from compiling class
const noop = () => {
    return null;
};

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.sass'] = noop;
require.extensions['.less'] = noop;
