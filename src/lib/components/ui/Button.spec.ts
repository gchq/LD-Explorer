/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Button from './Button.svelte';
import { fireEvent } from '@testing-library/svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

describe('Button component', () => {
	describe('default behavior', () => {
		let component: Button;

		beforeEach(async () => {
			component = (await render(Button, { label: 'Test' })).component as Button;
		});

		it('renders the button with the appropriate label and role', async () => {
			expect(await screen.findByShadowRole('button', { name: 'Test' })).toBeInTheDocument();
		});

		it('is enabled by default', async () => {
			expect(await screen.findByShadowRole('button', { name: 'Test' })).not.toBeDisabled();
		});

		it('dispatches a click event when clicked', async () => {
			const clicked = vi.fn();
			component.$on('click', clicked);

			const theButton = await screen.findByShadowRole('button');
			await fireEvent.click(theButton);

			expect(clicked).toHaveBeenCalledOnce();
		});
	});

	it('allows you to disable the button', async () => {
		await render(Button, { label: 'Test', disabled: true });
		expect(await screen.findByShadowRole('button', { name: 'Test' })).toBeDisabled();
	});

	it('renders an aria label if one is given', async () => {
		await render(Button, { label: 'Bar', ariaLabel: 'Foo' });
		expect(await screen.findByShadowRole('button', { name: 'Foo' })).toBeInTheDocument();
	});
});
