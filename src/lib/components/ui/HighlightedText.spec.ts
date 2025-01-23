/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import HighlightedText from './HighlightedText.svelte';
import { render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

describe('HighlightedText component', () => {
	const exampleText = 'The Quick Brown Fox Jumps Quickly Over The Lazy Dog';

	describe('Default behavior', () => {
		let highlightedText: HTMLElement;

		beforeEach(async () => {
			render(HighlightedText, { text: exampleText, highlight: 'quick' });
			highlightedText = screen.getByText('The', {
				exact: false
			});
		});

		it('Creates a text element', () => {
			expect(highlightedText).toBeInTheDocument();
		});

		it('Applies mark tags to case insensitive highlight text', () => {
			// See https://svelte.dev/docs/svelte/v5-migration-guide#Other-breaking-changes-Hydration-works-differently
			// Svelte 5 uses comments to make hydration work. Removing these in the interest of making the test more readable.
			expect(highlightedText.innerHTML.replaceAll('<!---->', '')).toContain(
				'The <mark>Quick</mark> Brown Fox Jumps <mark>Quick</mark>ly Over The Lazy Dog'
			);
		});
	});

	describe('When passed text to hightlight that is not in the passed text', () => {
		it('Does not apply mark tags', async () => {
			render(HighlightedText, { text: exampleText, highlight: 'foo' });
			expect(screen.getByText(exampleText)).toBeInTheDocument();
		});
	});
});
