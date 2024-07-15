/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import TableRow from './TableRow.svelte';
import { render } from '$test-helpers/render';

describe('TableRow component', () => {
	it('renders a tr element', () => {
		const { container } = render(TableRow);
		expect(container.querySelector('tr')).toBeInTheDocument();
	});
});
