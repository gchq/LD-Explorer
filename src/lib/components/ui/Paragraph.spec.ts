/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Paragraph from './Paragraph.svelte';
import { hydratedRender as render } from '$test-helpers/render';

describe('Paragraph component', () => {
	it('renders an ic-typography', async () => {
		const { container } = await render(Paragraph);
		expect(container.querySelector('ic-typography')).toBeInTheDocument();
	});
});
