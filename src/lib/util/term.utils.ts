/* (c) Crown Copyright GCHQ */

import type { Prefix } from '$lib/types';

/**
 * abbreviateTermPrefix
 *
 * Takes a term value (fully qualified) and a set of prefixes. If the term contains the iri from any prefix,
 * it returns the term value with the IRI swapped out for the label (e.g. www.example.com/foobar becomes ex:foobar).
 *
 * In addition, this function ignores http vs https and considers these to represent the same resource.
 *
 * @param {string} termValue
 * @param {Prefix[]} prefixes
 * @returns {string}
 */
export function abbreviateTermPrefix(termValue: string, prefixes: Prefix[]) {
	const httpOrHttps = /^(http|https):\/\//;
	// We want to consider http:// and https:// IRIs to be the same.
	const iriWithoutProtocol = termValue.replace(httpOrHttps, '');

	let abbreviatedTerm = undefined;
	prefixes.forEach(({ iri, label }) => {
		const prefixWithoutProtocol = iri.replace(httpOrHttps, '');
		if (iriWithoutProtocol.startsWith(prefixWithoutProtocol)) {
			abbreviatedTerm = iriWithoutProtocol.replace(prefixWithoutProtocol, `${label}:`);
		}
	});

	return abbreviatedTerm || termValue;
}
