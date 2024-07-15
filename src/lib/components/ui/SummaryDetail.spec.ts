/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import SummaryDetail from './SummaryDetail.svelte';
import { render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

describe('SummaryDetail component', () => {
	it('renders a detail element with the passed-in summary text', async () => {
		render(SummaryDetail, { summaryText: 'Foobar' });
		expect(screen.getByText('Foobar')).toBeInTheDocument();
	});
});
