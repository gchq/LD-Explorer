/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import TableHead from './TableHead.svelte';
import { render } from '$test-helpers/render';

describe('TableBody component', () => {
	it('renders a thead element', () => {
		const { container } = render(TableHead);
		expect(container.querySelector('thead')).toBeInTheDocument();
	});
});
