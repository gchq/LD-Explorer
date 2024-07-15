/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import TextField from './TextField.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

describe('TextField component', () => {
	let textfield: HTMLElement;

	describe('default behavior', () => {
		it('renders a textfield with the appropriate value', async () => {
			await render(TextField, { label: 'Foo', value: 'Bar' });

			textfield = await screen.findByShadowLabelText('Foo');
			expect(textfield).toBeInTheDocument();
			expect(textfield).toHaveValue('Bar');
		});
	});

	// These tests aren't particularly nice as they just test for the existence of classes, but
	// it's the only way of making sure those features are covered as "adding classes" is all they
	// do.
	describe('when rendered as an inline code editor', () => {
		let hostTextField: HTMLIcTextFieldElement;

		beforeEach(async () => {
			const container = (
				await render(TextField, {
					label: 'Foo',
					value: 'Bar',
					codeEditor: true,
					inline: true
				})
			).container;

			textfield = await screen.findByShadowLabelText('Foo');
			hostTextField = container.querySelector('ic-text-field') as HTMLIcTextFieldElement;
		});

		it('has the correct class for rendering mono', async () => {
			expect(hostTextField).toHaveClass('font-mono');
		});

		it('has the correct class for rendering inline', async () => {
			expect(hostTextField).toHaveClass('inline-block');
		});
	});

	describe('Validation', () => {
		describe('when validation is enabled and the textfield is invalid', () => {
			beforeEach(async () => {
				await render(TextField, {
					label: 'Foo',
					value: 'Bar',
					validationEnabled: true,
					isValid: false
				});

				textfield = await screen.findByShadowLabelText('Foo');
			});

			it('renders a textfield with the appropriate value', async () => {
				expect(textfield).toBeInTheDocument();
			});

			it('adds the correct aria tag', () => {
				expect(textfield).toHaveAttribute('aria-invalid', 'true');
			});
		});

		describe('when validation is not enabled and the textfield is invalid', () => {
			beforeEach(async () => {
				await render(TextField, {
					label: 'Foo',
					value: 'Bar',
					validationEnabled: false,
					isValid: false
				});
				textfield = await screen.findByShadowLabelText('Foo');
			});

			it("doesn't mark the field as invalid", () => {
				expect(textfield).not.toHaveAttribute('aria-invalid', 'true');
			});
		});
	});
});
