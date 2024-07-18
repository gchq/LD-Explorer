/* (c) Crown Copyright GCHQ */

// PUBLIC_VERSION will be set to the version number from package.json
export const version = PUBLIC_VERSION;

// As we will not be the only application hosted out of this github pages domain,
// we need to namespace any domain specific keys (such as those written to localstorage).
export const namespace = 'ld-explorer/';
