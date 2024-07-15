/* (c) Crown Copyright GCHQ */

import { test as base } from '@playwright/test';
import { readExampleData } from '$e2e/helpers/file';

export type DataFixtures = {
	sherlockExampleDataTTL: string;
	sherlockExampleDataJSONLD: string;
};

//
// Question: Could we/should we adopt a metaprogramming type approach to this like we have
// in the pageFixtures? If every piece of example data just invovles reading a file and passing
// it to the test, we could reduce a lot of repeatition (that said, I do not believe that
// there are enough examples for this pattern to be certain yet)
//
export const test = base.extend<DataFixtures>({
	// eslint-disable-next-line no-empty-pattern
	sherlockExampleDataTTL: async ({}, use) => {
		await use(readExampleData('sherlockTTL.ttl'));
	},
	// eslint-disable-next-line no-empty-pattern
	sherlockExampleDataJSONLD: async ({}, use) => {
		await use(readExampleData('sherlockJSONLD.txt'));
	}
});
