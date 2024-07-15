/* (c) Crown Copyright GCHQ */

import { render as originalRender, waitFor } from '@testing-library/svelte';
import { expect } from 'vitest';

/**
 *
 * waitForHydration
 *
 * For tests which use ICDS components (and vicariously Stencil), we need accomodate certain asynchronous events
 * prior to testing the DOM in order to avoid race conditions. In particular, wait for
 * the `appload` event to be seen. It has been observed that sometimes this `appload` event fires before the DOM body has been populated (and then
 * fires again afterwards), so this function also waits that.
 *
 * https://stenciljs.com/docs/api#the-appload-event
 *
 * While the `findBy` variants are supposed to accomodate for this kind of waiting, what we were seeing was the
 * component would render, the tests run, the environment tears itself down and THEN stencil would start complaining
 * that it was trying to boostrap components that had since been torn down - so we were seeing lots of ugly
 * messages in the logs. It also appeared that Stencil isn't particularly resiliant to this kind of error, so often we would also see
 * tests failing as a result of this having been encountered.
 *
 * With this new version of the render function, we can wait for hydration to be fully completed before proceeding
 * to test the components.
 *
 * @param fn a function with the same signature as `render` from the testing library.
 * @returns {async fn} an asynchronous version of the passed in function that waits for hydration.
 */
const waitForHydration = <T extends Parameters<typeof originalRender>, U>(
	fn: (...args: T) => U
) => {
	return async (...args: T): Promise<U> => {
		let appReadyCount = false;

		window.addEventListener('appload', () => {
			appReadyCount = true;
		});

		const view = fn(...args);
		await waitFor(() => expect(document.body.innerHTML.length).toBeGreaterThan(0));
		await waitFor(() => expect(appReadyCount).toBeTruthy(), {
			timeout: 100000,
			interval: 1000
		});

		return view;
	};
};

// Use this version if there are no ICDS components in the test you're rendering
export const render = originalRender;

// Use this version if there are ICDS components in the test you're rendering. Note that if you
// try to use this on tests where there is no ICDS component being used, your test will time out (because
// the `appload` event will never be emitted)
export const hydratedRender = waitForHydration((...args) => originalRender(...args));
