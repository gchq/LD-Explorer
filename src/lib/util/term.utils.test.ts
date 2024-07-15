/* (c) Crown Copyright GCHQ */

import { abbreviateTermPrefix } from './term.utils';

describe('abbreviateTermPrefixes', () => {
	describe('when there is a relevant prefix', () => {
		it('swaps out the iri in the term value for the label', () => {
			const prefixes = [
				{
					label: 'ex',
					iri: 'https://www.example.com/'
				}
			];

			expect(abbreviateTermPrefix('https://www.example.com/foobar', prefixes)).toEqual('ex:foobar');
		});

		describe('when the prefix is a URL starting with http://', () => {
			it('also tries the https:// variant', () => {
				const prefixes = [
					{
						label: 'ex',
						iri: 'http://www.example.com/'
					}
				];

				expect(abbreviateTermPrefix('https://www.example.com/foobar', prefixes)).toEqual(
					'ex:foobar'
				);
			});
		});

		describe('when the prefix is a URL starting with https://', () => {
			it('also tries the http:// variant', () => {
				const prefixes = [
					{
						label: 'ex',
						iri: 'https://www.example.com/'
					}
				];

				expect(abbreviateTermPrefix('http://www.example.com/foobar', prefixes)).toEqual(
					'ex:foobar'
				);
			});
		});
	});

	describe('when there is no relevant prefix', () => {
		it('leaves the term value unchanged', () => {
			const prefixes = [
				{
					label: 'ex',
					iri: 'https://www.example.com/'
				}
			];

			expect(abbreviateTermPrefix('https://www.foobar.com/example', prefixes)).toEqual(
				'https://www.foobar.com/example'
			);
		});
	});
});
