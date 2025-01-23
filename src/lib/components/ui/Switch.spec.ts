/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import Switch from './Switch.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';
import userEvent from '@testing-library/user-event';

describe('Switch component', () => {
	const exampleProps = {
		label: 'foo',
		helperText: 'helpful info',
		checked: false
	};

	it('renders the correct label', async () => {
		await render(Switch, exampleProps);
		expect(await screen.findByShadowLabelText(exampleProps.label)).toBeInTheDocument();
	});

	it('renders the correct helper text', async () => {
		await render(Switch, exampleProps);
		expect(await screen.findByShadowText(exampleProps.helperText)).toBeInTheDocument();
	});

	it('dispatches a change event when clicked', async () => {
		const user = userEvent.setup();
		const changed = vi.fn();
		await render(Switch, { ...exampleProps, onchange: changed });
		const theSwitch = await screen.findByShadowLabelText(exampleProps.label);
		await user.click(theSwitch);

		expect(changed).toHaveBeenCalledOnce();
	});
});
