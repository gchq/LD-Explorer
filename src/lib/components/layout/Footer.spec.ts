/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import { hydratedRender, render } from '$test-helpers/render';
import Footer from './Footer.svelte';
import { screen } from 'shadow-dom-testing-library';

describe('Footer component', () => {
	describe('Default behaviour', () => {
		beforeEach(async () => {
			await hydratedRender(Footer);
		});

		it('Includes crown copyright', async () => {
			expect(await screen.findByShadowText('© Crown Copyright')).toBeInTheDocument();
		});
	});

	it('Does not show a classification banner', async () => {
		const { container } = render(Footer);
		expect(container.querySelector('ic-classification-banner')).not.toBeInTheDocument();
	});
});
