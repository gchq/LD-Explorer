/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import TableBody from './TableBody.svelte';
import { render } from '$test-helpers/render';

describe('TableBody component', () => {
	it('renders a tbody element', () => {
		const { container } = render(TableBody);
		expect(container.querySelector('tbody')).toBeInTheDocument();
	});
});
