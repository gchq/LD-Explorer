/* (c) Crown Copyright GCHQ */

import List from './List.svelte';
import { render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

describe('List component', () => {
	it('can render unordered lists', async () => {
		render(List, { listType: 'ul' });
		const list = screen.getByRole('list');
		expect(list.tagName).toBe('UL');
	});

	it('can render ordered lists', async () => {
		render(List, { listType: 'ol' });
		const list = screen.getByRole('list');
		expect(list.tagName).toBe('OL');
	});

	describe('when asked to apply vertical margins', () => {
		it('still renders the list correctly', async () => {
			render(List, { listType: 'ul', applyVerticalMargins: true });
			const list = screen.getByRole('list');
			expect(list.tagName).toBe('UL');
		});
	});

	describe('when rendering a symbol-less list', () => {
		beforeEach(async () => {
			render(List, { listType: 'no-symbol' });
		});

		it('renders them as an unordered list', () => {
			const list = screen.getByRole('list');
			expect(list.tagName).toBe('UL');
		});

		it('gives them the appropriate tailwind class', () => {
			const list = screen.getByRole('list');
			expect(list.className).toContain('list-none');
		});
	});
});
