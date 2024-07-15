/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Heading from './Heading.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

const exampleText = 'Hello World';

describe('Heading component', async () => {
	describe('default behavior', async () => {
		it('Adds a level 2 heading to the page with the correct text', async () => {
			await render(Heading, { text: exampleText });
			expect(
				await screen.findByRole('heading', { level: 2, name: exampleText })
			).toBeInTheDocument();
		});
	});

	describe('when passed a tag', () => {
		it('Adds the heading with the appropriate passed in tag', async () => {
			await render(Heading, { text: exampleText, tag: 'h4' });
			expect(
				await screen.findByRole('heading', { level: 4, name: exampleText })
			).toBeInTheDocument();
		});
	});
});
