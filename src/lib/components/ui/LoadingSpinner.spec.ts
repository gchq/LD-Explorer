/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import LoadingSpinner from './LoadingSpinner.svelte';
import { render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

describe('LoadingSpinner component', () => {
	describe('default behavior', () => {
		beforeEach(() => {
			render(LoadingSpinner);
		});

		it('Adds a loading spinner with appropriate role', () => {
			expect(screen.getByRole('status')).toBeInTheDocument();
		});

		it('includes text for screen readers', () => {
			const loadingText = screen.getByText('Loading...');
			expect(loadingText).toBeInTheDocument();
			expect(loadingText).toHaveClass('sr-only');
		});
	});
});
