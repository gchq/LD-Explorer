/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/svelte';
import Tab from './Tab.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import userEvent from '@testing-library/user-event';

describe('Tab component', () => {
	describe('default behavior', () => {
		let component: Tab;
		let tab: HTMLElement;

		beforeEach(async () => {
			component = (await render(Tab, { title: 'Foo' })).component as Tab;
			tab = await screen.findByRole('tab', { name: 'Foo' });
		});

		it('renders the tab with the correct name', async () => {
			expect(tab).toBeInTheDocument();
		});

		it('dispatches a click event when clicked', async () => {
			const user = userEvent.setup();

			const clicked = vi.fn();
			component.$on('click', clicked);
			await user.click(tab);

			expect(clicked).toHaveBeenCalledOnce();
		});
	});

	describe('when disabled', () => {
		let tab: HTMLElement;

		beforeEach(async () => {
			await render(Tab, { title: 'Foo', disabled: true });
			tab = await screen.findByRole('tab', { name: 'Foo' });
		});

		it('renders the tab with the correct name', async () => {
			expect(tab).toBeInTheDocument();
		});

		it('has the correct aria-disabled attribute', async () => {
			expect(tab).toHaveAttribute('aria-disabled', 'true');
		});
	});
});
