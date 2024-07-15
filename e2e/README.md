# E2E Testing

E2E Testing in LD Explorer is accomplished using Playwright.

https://playwright.dev/

## Running the e2e tests

Run from the command line.

```
npm run test:e2e
```

Alternatively run the following to open up an interactive UI (if you are running on a VM, you'll need to run this from the VM desktop). This UI is particularly useful when developing tests as it allows you to scroll through the timeline of events visually, making things easier to debug.

```
npm run test:e2e -- --ui
```

You can run a single tests, or tests from a certain folder, as follows:

```
# CLI
npm run test:e2e -- tests/pages/data-sources --ui

# With UI
npm run test:e2e -- tests/pages/data-sources --ui
```

## Tests

LD Explorer has three kinds of end to end test.

- `smoke` - verify certain basic functionalities are working such as navigation and accessiblity, without getting in to the details of a particular feature.
- `features` - these are "vertical" tests which focus in on a particular feature.
- `journeys` - these are "horizontal" tests which go wide across multiple features, testing a user's flow through the application.

Specific comopnents are not tested via e2e - component tests live alongsid the components themselves and are tested using unit/integration testing methods (via `testing-library`).

## Page Object Models

Page object models are located under the `pages` folder - these make it easier to write tests by creating an API over the top of common page interactions. See the playwright documentation for details.

https://playwright.dev/docs/pom

## Fixtures

Fixtures, located in the `fixtures` folder, make common operations and values more easily available in tests.

## Gotchas

- Be careful using `goto`: Currently, LD Explorer stores all its data in memory on the client - meaning if you refresh your browser then the data dissapears. This is entirely by design, but it does have a few implications for e2e tests. Because the playwright `goto` function creates a new browser context whenever it's called, it'll clear out all your data. There are ways of getting around this, but the simplest approach for now is to call `goto` exactly once for each test, and then navigate around the app manually from there (POMs in the `e2e/pages` folder have a `navigateTo` function that does this for you).
