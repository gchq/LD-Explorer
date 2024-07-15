/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import ProductFeature from './ProductFeature.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from '@testing-library/svelte';

const testProps = { title: 'Foobar', screenshot: 'foo.jpg', screenshotAlt: 'Foo alt' };

describe('ProductFeature component', () => {
	it('Gives the product feature the appropriate title, screenshot and alt text', async () => {
		await render(ProductFeature, testProps);

		// The title
		expect(await screen.findByText('Foobar')).toBeInTheDocument();

		// image
		const image = screen.getByAltText('Foo alt');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', 'foo.jpg');
	});

	describe('alignment', () => {
		describe('when aligned left', () => {
			it('applies the appropriate class', async () => {
				const { container } = await render(ProductFeature, { ...testProps, align: 'left' });
				const sectionContainer = container.querySelector('ic-section-container');
				expect(sectionContainer).toHaveClass('lg:flex-row-reverse');
				expect(sectionContainer).not.toHaveClass('lg:flex-row');
			});
		});
		describe('when aligned right', () => {
			it('applies the appropriate class', async () => {
				const { container } = await render(ProductFeature, { ...testProps, align: 'right' });
				const sectionContainer = container.querySelector('ic-section-container');
				expect(sectionContainer).toHaveClass('lg:flex-row');
				expect(sectionContainer).not.toHaveClass('lg:flex-row-reverse');
			});
		});
	});
});
