/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Section from './Section.svelte';
import { hydratedRender as render } from '$test-helpers/render';

describe('Section component', () => {
	describe('default behavior', () => {
		it('renders an ic-section-container', async () => {
			const { container } = await render(Section);
			expect(container.querySelector('ic-section-container')).toBeInTheDocument();
		});
	});

	describe('when you apply bottom padding', () => {
		it('renders an ic-section-container', async () => {
			const { container } = await render(Section, { applyBottomPadding: true });
			expect(container.querySelector('ic-section-container')).toBeInTheDocument();
		});
	});
});
