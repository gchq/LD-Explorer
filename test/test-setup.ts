/* (c) Crown Copyright GCHQ */
import '@testing-library/jest-dom/vitest';
import { defineCustomElements } from '@ukic/web-components/loader';
import { beforeAll, vi } from 'vitest';
import { configure } from '@testing-library/dom';

// Register ICDS components with DOM
beforeAll(() => {
	defineCustomElements(window);

	// Workaround for a happy-dom bug introduced in v20.13.1 where `visibility: inherit`
	// is discarded by getComputedStyle instead of being resolved to the parent's value.
	// see https://github.com/capricorn86/happy-dom/issues/2347
	//
	// We can drop this style when that ticket's fixed.
	const style = document.createElement('style');
	style.textContent = '.hydrated { visibility: visible; }';
	document.head.appendChild(style);
}, 1000);

// Configure testing library
configure({
	// Increase timeout for waitFor and find queries (sometimes the DOM isn't hydrated in 1 second)
	asyncUtilTimeout: 1000
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
