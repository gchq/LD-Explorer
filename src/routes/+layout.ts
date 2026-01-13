/* (c) Crown Copyright GCHQ */

// This line essentially puts the whole app into "SPA mode" (https://kit.svelte.dev/docs/single-page-apps) which
// is a requirement for deploying to an environment such as github pages.

// Individual pages can then be instructed to pre-render where possible (e.g. if the page just consists of
// static content)

export const ssr = false;
