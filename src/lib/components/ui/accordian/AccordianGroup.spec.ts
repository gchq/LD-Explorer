/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import AccordianGroup from './AccordianGroup.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

describe('AccordianGroup component', () => {
	it('Renders an accordian group with the appropriate title', async () => {
		const groupTitle = 'my funky accordian group';
		await render(AccordianGroup, { groupTitle });

		expect(
			await screen.findByShadowRole('heading', { name: groupTitle, level: 3 })
		).toBeInTheDocument();
	});
});
