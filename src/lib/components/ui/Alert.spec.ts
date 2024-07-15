/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Alert from './Alert.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

describe('Alert component', () => {
	it('renders the alert with the appropriate heading, message and role', async () => {
		const heading = 'My Heading';
		const message = 'My Message';

		await render(Alert, { heading, message });
		expect(await screen.findByShadowRole('alert')).toBeInTheDocument();
		expect(await screen.findByShadowText(heading)).toBeInTheDocument();
		expect(await screen.findByShadowText(message)).toBeInTheDocument();
	});
});
