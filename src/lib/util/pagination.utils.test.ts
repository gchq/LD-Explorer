/* (c) Crown Copyright GCHQ */

import { getItemsForPage, getTotalPages } from './pagination.utils';

const tenItems = [...Array(10).keys()];
const elevenItems = [...Array(11).keys()];

describe('getTotalPages', () => {
	it('calculates the correct number of pages', () => {
		expect(getTotalPages(10, tenItems)).toEqual(1);
		expect(getTotalPages(10, elevenItems)).toEqual(2);
		expect(getTotalPages(11, tenItems)).toEqual(1);
		expect(getTotalPages(11, elevenItems)).toEqual(1);
		expect(getTotalPages(1, tenItems)).toEqual(10);
	});
});

describe('getItemsForPage', () => {
	it('returns the items for the given page', () => {
		const items = [1, 2, 3, 4, 5, 6];

		// first two pages, 2 items per page
		expect(getItemsForPage(0, 2, items)).toEqual([1, 2]);
		expect(getItemsForPage(1, 2, items)).toEqual([3, 4]);

		// first two pages, 3 items per page
		expect(getItemsForPage(0, 3, items)).toEqual([1, 2, 3]);
		expect(getItemsForPage(1, 3, items)).toEqual([4, 5, 6]);

		// first page, 6 items per page (should return all items)
		expect(getItemsForPage(0, 6, items)).toEqual(items);

		// first page, 100 items per page (should return all items)
		expect(getItemsForPage(0, 100, items)).toEqual(items);

		// 100th page, 10 items per page (should return empty array)
		expect(getItemsForPage(100, 10, items)).toHaveLength(0);
	});
});
