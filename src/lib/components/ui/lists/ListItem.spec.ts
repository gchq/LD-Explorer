/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import ListItem from './ListItem.svelte';
import { render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

describe('ListItem component', () => {
	it('renders an li', () => {
		render(ListItem);
		expect(screen.getByRole('listitem')).toBeInTheDocument();
	});
});
