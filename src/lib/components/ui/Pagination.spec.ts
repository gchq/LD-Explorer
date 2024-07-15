/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Pagination from './Pagination.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

describe('Pagination component', () => {
	describe('default behavior', () => {
		beforeEach(async () => {
			await render(Pagination, {
				pageNumber: 0,
				totalPages: 10,
				itemCount: 10,
				includeFilter: true
			});
		});

		it('Adds the navigation element', async () => {
			expect(await screen.findByShadowRole('navigation')).toBeInTheDocument();
		});

		it('Adds the filter element', async () => {
			expect(
				await screen.findByShadowRole('searchbox', {
					name: 'Filter results by text'
				})
			).toBeInTheDocument();
		});
	});

	describe('when given a filter', () => {
		beforeEach(async () => {
			await render(Pagination, {
				pageNumber: 0,
				totalPages: 10,
				itemCount: 10,
				filterText: 'foobar',
				includeFilter: true
			});
		});

		it('displays the number of filtered items', async () => {
			expect(await screen.getByText(/10 items after filter/)).toBeInTheDocument();
		});
	});

	describe('when you pass in the "bottom" property', () => {
		beforeEach(async () => {
			await render(Pagination, { pageNumber: 0, totalPages: 10, bottom: true, itemCount: 10 });
		});

		it('Adds the navigation element', async () => {
			expect(await screen.findByShadowRole('navigation')).toBeInTheDocument();
		});
	});
});
