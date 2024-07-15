/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Table from './Table.svelte';
import { render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

describe('Table component', () => {
	it('renders a table', () => {
		render(Table);
		expect(screen.getByRole('table')).toBeInTheDocument();
	});
});
