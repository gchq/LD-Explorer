/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import FilterField from './FilterField.svelte';
import { render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';
import { waitFor, fireEvent } from '@testing-library/svelte';

describe('FilterField component', () => {
	let filterField: HTMLElement;
	let container: HTMLDivElement;

	describe('default behavior', () => {
		beforeEach(async () => {
			render(FilterField, { label: 'Foo', value: 'Bar' });
			filterField = await screen.findByShadowLabelText('Foo');
			container = filterField.closest('div') as HTMLDivElement;
		});

		it('renders a textfield with the appropriate value', async () => {
			expect(filterField).toBeInTheDocument();
			expect(filterField).toHaveValue('Bar');
		});

		it('has a ring when focussed', async () => {
			await fireEvent.focus(filterField);

			await waitFor(() => {
				// Bad practice to test for class existence but this is the only thing that
				// changes on focus.
				expect(container).toHaveClass('ring-4');
			});
		});
	});
});
