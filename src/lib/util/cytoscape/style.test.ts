/* (c) Crown Copyright GCHQ */

import style from './style';

describe('style', () => {
	it('matches the snapshot', () => {
		expect(style).toMatchSnapshot();
	});

	it('is a correctly formatted array containing style data', () => {
		const uniqueKeys = Array.from(new Set(style.flatMap(Object.keys)));
		expect(Array.from(uniqueKeys)).toHaveLength(2);
		expect(Array.from(uniqueKeys)).toContain('style');
		expect(Array.from(uniqueKeys)).toContain('selector');
	});
});
