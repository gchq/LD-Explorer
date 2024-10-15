/* (c) Crown Copyright GCHQ */

import { applyPolyfills, defineCustomElements } from '@ukic/web-components/loader';
import { beforeAll, vi } from 'vitest';
import { configure } from '@testing-library/dom';

// Register ICDS components with DOM
beforeAll(() => {
	applyPolyfills().then(() => {
		defineCustomElements(window);
	});
}, 100000);

// Configure testing library
configure({
	// Increase timeout for waitFor and find queries (sometimes the DOM isn't hydrated in 1 second)
	asyncUtilTimeout: 100000
});

// matchMedia is not provided by the mock DOM - mock it here to allow tests to run.
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});
