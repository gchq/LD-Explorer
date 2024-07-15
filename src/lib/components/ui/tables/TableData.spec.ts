/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import TableData from './TableData.svelte';
import { render } from '$test-helpers/render';

describe('TableData component', () => {
	it('renders a td element', () => {
		const { container } = render(TableData);
		expect(container.querySelector('td')).toBeInTheDocument();
	});
});
