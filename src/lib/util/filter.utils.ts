/* (c) Crown Copyright GCHQ */

import type { Bindings } from '@comunica/types';
import type { Quad } from 'n3';

/**
 * Takes a collection of bindings and a search term, then filters through the collection to include
 * only the bindings that include that search term.
 * @param bindingsCollection a collection of bindings (like rows in a table)
 * @param searchTerm a term to search for (case insensitive)
 * @returns the filtered bindings
 */
export function filterBindings(bindingsCollection: Bindings[], searchTerm: string): Bindings[] {
	if (!searchTerm.length) return bindingsCollection;
	const lowerCaseSearchTerm = searchTerm.toLowerCase();

	return bindingsCollection.filter((bindings) => {
		for (const { value } of bindings.values()) {
			if (value.toLowerCase().includes(lowerCaseSearchTerm)) return true;
		}
	});
}

export function filterQuads(quadCollection: Quad[], searchTerm: string): Quad[] {
	if (!searchTerm.length) return quadCollection;
	const lowerCaseSearchTerm = searchTerm.toLowerCase();

	return quadCollection.filter((quad) => {
		return (
			quad.subject.value.toLowerCase().includes(lowerCaseSearchTerm) ||
			quad.predicate.value.toLowerCase().includes(lowerCaseSearchTerm) ||
			quad.object.value.toLowerCase().includes(lowerCaseSearchTerm)
		);
	});
}
