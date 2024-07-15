/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Tree from './Tree.svelte';
import { render } from '$test-helpers/render';

describe('Tree component', () => {
	describe('default behavior', () => {
		it('renders a ul element without a border', () => {
			const { container } = render(Tree);
			const ul = container.querySelector('ul');
			expect(ul).not.toHaveClass('border-l');
		});
	});

	describe('when asked to draw as a branch', () => {
		it('adds a left hand border to the ul element', () => {
			const { container } = render(Tree, { drawBranch: true });
			const ul = container.querySelector('ul');
			expect(ul).toHaveClass('border-l');
		});
	});
});
