/* (c) Crown Copyright GCHQ */

import CodeBlock from './CodeBlock.svelte';
import { render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

describe('CodeBlock component', () => {
	it('creates a pre tag with the code inside', async () => {
		const code = "console.log('foobar');";
		render(CodeBlock, { code });
		const codeblock = screen.getByText(code);
		expect(codeblock).toBeInTheDocument();
	});
});
