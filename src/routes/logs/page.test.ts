/* (c) Crown Copyright GCHQ */

import LogsPage from './+page.svelte';
import { logger } from '$stores/logger.store';
import { hydratedRender as render } from '$test-helpers/render';
import { cleanup, screen, waitFor, within } from '@testing-library/svelte';
import { screen as shadowScreen } from 'shadow-dom-testing-library';
import { tick } from 'svelte';
import userEvent from '@testing-library/user-event';

const timestamp = 1700000000000;
const metadata = { source: 'Example source' };

describe('Logs page', () => {
	beforeEach(() => {
		logger.clear();
		vi.spyOn(Date, 'now').mockReturnValue(timestamp);
		vi.spyOn(console, 'error').mockImplementation(() => undefined);
	});

	afterEach(() => {
		cleanup();
		logger.clear();
		vi.restoreAllMocks();
	});

	it('renders repeated errors recorded in the same millisecond', async () => {
		for (let i = 0; i < 3; i++) {
			logger.addError('Query', new Error('Request failed'), metadata);
		}

		await render(LogsPage);

		const rows = screen.getAllByRole('listitem');
		expect(rows).toHaveLength(3);
		for (const row of rows) {
			expect(row).toHaveTextContent('Query: Error (error)');
			expect(row).toHaveTextContent('Request failed');
			expect(row).toHaveClass('bg-icds-error-bg');
			expect(row.querySelector('time')).toHaveTextContent(new Date(timestamp).toLocaleString());
			expect(within(row).getByTestId('log-details')).toHaveTextContent(JSON.stringify(metadata));
		}
	});

	it('keeps expanded details with their entry across updates and resets them after clearing', async () => {
		const user = userEvent.setup();
		logger.addErrorMessage('Query', 'Request failed', metadata);
		await render(LogsPage);
		const originalRow = screen.getByRole('listitem');
		const originalDetails = originalRow.querySelector('details');
		await user.click(within(originalRow).getByText('Details'));
		expect(originalDetails).toHaveAttribute('open');

		for (let i = 0; i < 3; i++) {
			logger.addErrorMessage('Query', 'Request failed', metadata);
			await tick();
			expect(screen.getAllByRole('listitem')).toHaveLength(i + 2);
			expect(originalRow).toBeInTheDocument();
			expect(originalDetails).toHaveAttribute('open');
			for (const row of screen.getAllByRole('listitem').filter((row) => row !== originalRow)) {
				expect(row.querySelector('details')).not.toHaveAttribute('open');
			}
		}

		await user.click(await shadowScreen.findByShadowRole('button', { name: 'Clear Logs' }));
		expect(screen.queryAllByRole('listitem')).toHaveLength(0);
		expect(await shadowScreen.findByShadowText('Logs Empty')).toBeInTheDocument();
		await waitFor(async () =>
			expect(await shadowScreen.findByShadowRole('button', { name: 'Clear Logs' })).toBeDisabled()
		);

		logger.addErrorMessage('Query', 'Request failed', metadata);
		logger.addErrorMessage('Query', 'Request failed', metadata);
		await tick();
		expect(screen.getAllByRole('listitem')).toHaveLength(2);
		expect(originalRow).not.toBeInTheDocument();
		for (const row of screen.getAllByRole('listitem')) {
			expect(row.querySelector('details')).not.toHaveAttribute('open');
		}
		await waitFor(async () =>
			expect(await shadowScreen.findByShadowRole('button', { name: 'Clear Logs' })).toBeEnabled()
		);
	});

	it('shows the newest 100 entries without moving expanded details to another entry', async () => {
		const user = userEvent.setup();
		for (let i = 0; i < 100; i++) {
			vi.mocked(Date.now).mockReturnValue(timestamp + i);
			logger.addInfo(`Entry ${i}`, `Message ${i}`, metadata);
		}
		await render(LogsPage);
		const retainedRow = screen.getAllByRole('listitem')[0];
		await user.click(within(retainedRow).getByText('Details'));

		vi.mocked(Date.now).mockReturnValue(timestamp + 100);
		logger.addInfo('Entry 100', 'Message 100', metadata);
		await tick();

		const rows = screen.getAllByRole('listitem');
		expect(rows).toHaveLength(100);
		expect(rows[0]).toHaveTextContent('Message 100');
		expect(rows[1]).toBe(retainedRow);
		expect(rows[99]).toHaveTextContent('Message 1');
		expect(screen.queryByText('Message 0')).not.toBeInTheDocument();
		expect(retainedRow.querySelector('details')).toHaveAttribute('open');
		expect(rows[0].querySelector('details')).not.toHaveAttribute('open');
	});
});
