/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import PageHeader from './PageHeader.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

const exampleHeading = 'Hello';
const exampleSubheading = 'World';

describe('PageHeader component', () => {
	beforeEach(async () => {
		await render(PageHeader, { heading: exampleHeading, subheading: exampleSubheading });
	});

	it('Adds an H2 to the page with the passed-in heading', async () => {
		expect(
			await screen.findByShadowRole('heading', { level: 2, name: exampleHeading })
		).toBeInTheDocument();
	});

	it('Adds the passed-in subheading text', async () => {
		expect(await screen.findByShadowText(exampleSubheading)).toBeInTheDocument();
	});
});
