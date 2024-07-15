/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import ButtonLink from './ButtonLink.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

describe('ButtonLink component', () => {
	it('creates a link with an appropriate href', async () => {
		await render(ButtonLink, { label: 'Test', href: '/test.htm' });
		expect(await screen.findByShadowRole('link', { name: 'Test' })).toHaveAttribute(
			'href',
			'/test.htm'
		);
	});

	describe('when provided with an href that has no leading slash', () => {
		it('adds the leading slash', async () => {
			await render(ButtonLink, { label: 'Test', href: 'test.htm' });
			expect(await screen.findByShadowRole('link', { name: 'Test' })).toHaveAttribute(
				'href',
				'/test.htm'
			);
		});
	});

	it('renders an aria label if one is given', async () => {
		const accessibleLabel = 'accessible label';
		await render(ButtonLink, { href: '/test.htm', label: 'Test', ariaLabel: accessibleLabel });
		expect(await screen.findByShadowRole('link', { name: accessibleLabel })).toBeInTheDocument();
	});
});
