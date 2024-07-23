/* (c) Crown Copyright GCHQ */

import { retrieveJSONObject, storeJSONObject } from './localStorage.utils';

const exampleObject = {
	foo: 'bar',
	fizz: 2,
	bang: true
};

describe('localStorage functionality', () => {
	afterEach(() => {
		localStorage.clear();
	});

	describe(storeJSONObject, () => {
		it('Sets an object on localStorage with a given key', () => {
			storeJSONObject('test', exampleObject);
			expect(JSON.parse(localStorage.getItem('test') || '""')).toStrictEqual(exampleObject);
		});
	});

	describe(retrieveJSONObject, () => {
		it('Returns an object from a given key of localStorage', () => {
			localStorage.setItem('test', JSON.stringify(exampleObject));
			expect(retrieveJSONObject('test')).toStrictEqual(exampleObject);
		});

		it('Fails gracefully upon encoutering corrupt storage items', () => {
			// Arrange
			const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			localStorage.setItem('test', 'this is not valid JSON');

			// Act
			const storedValue = retrieveJSONObject('test');

			// Assert
			expect(consoleWarn).toHaveBeenCalledOnce();
			expect(storedValue).toStrictEqual({});
		});

		it('Returns null if localStorage does not contain a given key', () => {
			expect(retrieveJSONObject('test')).toBeNull();
		});
	});
});
