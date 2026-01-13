/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Link from './Link.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

const exampleHref = '/test.htm';

describe('Link component', async () => {
	describe('default behavior', () => {
		it('Adds an internal link to the page with the appropriate href', async () => {
			await render(Link, { href: exampleHref });
			const link = await screen.findByShadowRole('link');
			expect(link).toHaveAttribute('href', exampleHref);
			expect(link).not.toHaveAttribute('target', '_blank');
			expect(link).not.toHaveAttribute('rel', 'noreferrer');
			expect(link).not.toHaveAttribute('referrerpolicy', 'no-referrer');
		});
	});

	describe('when the link is external', () => {
		it('Adds appropriate attributes to make the link open in a new tab', async () => {
			await render(Link, { href: exampleHref, external: true });
			const link = await screen.findByShadowRole('link');
			expect(link).toHaveAttribute('href', exampleHref);
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('rel', 'noreferrer');
			expect(link).toHaveAttribute('referrerpolicy', 'no-referrer');
		});
	});
});
