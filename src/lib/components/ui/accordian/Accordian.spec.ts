/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Accordian from './Accordian.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

describe('Accordian component', () => {
	it('Renders an accordian with the appropriate heading as a button', async () => {
		const heading = 'my funky accordian';
		await render(Accordian, { heading });
		expect(await screen.findByShadowRole('button', { name: heading })).toBeInTheDocument();
	});
});
