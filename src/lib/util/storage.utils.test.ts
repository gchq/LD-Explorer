/* (c) Crown Copyright GCHQ */

import { getObject, setObject } from './storage.utils';

const exampleObject = {
	foo: 'bar',
	fizz: 2,
	bang: true
};

describe('localStorage functionality', () => {
	afterEach(() => {
		localStorage.clear();
	});

	describe(setObject, () => {
		it('Sets an object on localStorage with a given key', () => {
			setObject('test', exampleObject);
			expect(JSON.parse(localStorage.getItem('test') || '""')).toStrictEqual(exampleObject);
		});
	});

	describe(getObject, () => {
		it('Returns an object from a given key of localStorage', () => {
			localStorage.setItem('test', JSON.stringify(exampleObject));
			expect(getObject('test')).toStrictEqual(exampleObject);
		});

		it('Returns null if localStorage does not contain a given key', () => {
			expect(getObject('test')).toBeNull();
		});
	});
});
