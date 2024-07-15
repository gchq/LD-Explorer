/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import TableHeading from './TableHeading.svelte';
import { render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

describe('TableHeading component', () => {
	it('renders a th element', () => {
		render(TableHeading, { value: 'Foobar' });
		expect(screen.getByText('Foobar')).toBeInTheDocument();
	});

	describe('alignment', () => {
		describe('when asked to align center', () => {
			it('still renders the element correctly', () => {
				render(TableHeading, { value: 'Foobar', alignment: 'center' });
				expect(screen.getByText('Foobar')).toBeInTheDocument();
			});
		});

		describe('when asked to align right', () => {
			it('still renders the element correctly', () => {
				render(TableHeading, { value: 'Foobar', alignment: 'right' });
				expect(screen.getByText('Foobar')).toBeInTheDocument();
			});
		});
	});
});
