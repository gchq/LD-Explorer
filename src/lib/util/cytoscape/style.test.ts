/* (c) Crown Copyright GCHQ */

import createCytoscapeStyle from './style';

describe('style', () => {
	it('matches the light-mode snapshot', () => {
		expect(createCytoscapeStyle()).toMatchSnapshot();
	});

	it('matches the dark-mode snapshot', () => {
		expect(createCytoscapeStyle(true)).toMatchSnapshot();
	});

	it('is a correctly formatted array containing style data', () => {
		const styles = createCytoscapeStyle();

		const uniqueKeys = Array.from(new Set(styles.flatMap(Object.keys)));
		expect(Array.from(uniqueKeys)).toHaveLength(2);
		expect(Array.from(uniqueKeys)).toContain('style');
		expect(Array.from(uniqueKeys)).toContain('selector');
	});
});
