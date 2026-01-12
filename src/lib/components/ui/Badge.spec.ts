/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Badge from './Badge.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

describe('Badge component', () => {
	describe('When passed the dot type', () => {
		it('Renders an ic-badge', async () => {
			const { container } = await render(Badge, { type: 'dot' });
			expect(container.querySelector('ic-badge')).toBeInTheDocument();
		});
	});

	describe('When passed the text type', () => {
		it('Adds the passed-in label text', async () => {
			const labelText = 'test';
			await render(Badge, { type: 'text', textLabel: labelText });
			expect(await screen.findByShadowText(labelText)).toBeInTheDocument();
		});
	});

	it('Allows an aria label to be passed in', async () => {
		const accessibleLabel = 'my a11y label';
		const { container } = await render(Badge, { type: 'dot', ariaLabel: accessibleLabel });
		expect(
			container.querySelector("ic-badge[accessible-label='my a11y label']")
		).toBeInTheDocument();
	});
});
