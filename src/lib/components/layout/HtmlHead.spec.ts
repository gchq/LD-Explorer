/* (c) Crown Copyright GCHQ */

import HtmlHead from './HtmlHead.svelte';
import { hydratedRender as render } from '$test-helpers/render';

describe('Header component', () => {
	it('Sets the page title correctly', async () => {
		await render(HtmlHead, { title: 'Foobar' });
		expect(document.title).toBe('Foobar - LD-Explorer');
	});
});
