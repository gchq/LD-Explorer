/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import TreeItem from './TreeItem.svelte';
import { render } from '$test-helpers/render';

describe('Tree component', () => {
	it('renders an li element', () => {
		const { container } = render(TreeItem);
		const ul = container.querySelector('li');
		expect(ul).toBeInTheDocument();
	});
});
