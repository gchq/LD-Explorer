/* (c) Crown Copyright GCHQ */

import { type Bindings, BindingsFactory } from '@comunica/bindings-factory';
import { DataFactory as N3DF, type Quad } from 'n3';
import { filterBindings, filterQuads } from './filter.utils';

const BF = new BindingsFactory();
const { namedNode, literal, quad, variable } = N3DF;
const personResource = namedNode('http://xmlns.com/foaf/0.1/Person');
const nameResource = namedNode('http://xmlns.com/foaf/0.1/name');
const rdfTypeResource = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');

/**
 * TERM FILTERING
 */
describe(filterBindings, () => {
	let bindingsCollection: Bindings[];

	beforeEach(() => {
		bindingsCollection = [
			// Bob
			BF.bindings([
				[variable('name'), literal('Bob')],
				[variable('type'), personResource]
			]),
			// Alice
			BF.bindings([
				[variable('name'), literal('Alice')],
				[variable('type'), personResource]
			]),
			// Joe
			BF.bindings([
				[variable('name'), literal('Joe')],
				[variable('type'), personResource]
			])
		];
	});

	describe('when the search term is an empty string', () => {
		it('does not filter anything, and just returns the same number of bindings', () => {
			const filteredBindings = filterBindings(bindingsCollection, '');
			expect(filteredBindings).toHaveLength(bindingsCollection.length);
		});
	});

	describe('when searching for literals', () => {
		it('matches any bindings that contain the search term', () => {
			const filteredBindings = filterBindings(bindingsCollection, 'Bob');
			// Only two of the bindings rows should have a name with "o" in.
			expect(filteredBindings).toHaveLength(1);
		});
		it('is case insensitive when it filters', () => {
			const filteredBindings = filterBindings(bindingsCollection, 'BOB');
			// Only two of the bindings rows should have a name with "o" in.
			expect(filteredBindings).toHaveLength(1);
		});
	});

	describe('when searching for terms', () => {
		it('matches any bindings that contain the search term', () => {
			const filteredBindings = filterBindings(bindingsCollection, personResource.value);
			// Only two of the bindings rows should have a name with "o" in.
			expect(filteredBindings).toHaveLength(3);
		});
		it('is case insensitive when it filters', () => {
			const filteredBindings = filterBindings(
				bindingsCollection,
				personResource.value.toUpperCase()
			);
			// Only two of the bindings rows should have a name with "o" in.
			expect(filteredBindings).toHaveLength(3);
		});
	});
});

/**
 * QUAD FILTERING
 */
describe(filterQuads, () => {
	let quadCollection: Quad[];

	beforeEach(() => {
		quadCollection = [
			// Bob
			quad(namedNode(':person1'), nameResource, literal('Bob')),
			quad(namedNode(':person1'), rdfTypeResource, personResource),
			// Alice
			quad(namedNode(':person2'), nameResource, literal('Alice')),
			quad(namedNode(':person2'), rdfTypeResource, personResource),
			// Joe
			quad(namedNode(':person3'), nameResource, literal('Joe')),
			quad(namedNode(':person3'), rdfTypeResource, personResource)
		];
	});

	describe('when the search term is an empty string', () => {
		it('does not filter anything, and just returns the same number of quads', () => {
			const filteredQuads = filterQuads(quadCollection, '');
			expect(filteredQuads).toHaveLength(quadCollection.length);
		});
	});

	describe('when searching for literals', () => {
		it('matches any bindings that contain the search term', () => {
			const filteredBindings = filterQuads(quadCollection, 'Bob');
			// Only two of the bindings rows should have a name with "o" in.
			expect(filteredBindings).toHaveLength(1);
		});
		it('is case insensitive when it filters', () => {
			const filteredBindings = filterQuads(quadCollection, 'BOB');
			// Only two of the bindings rows should have a name with "o" in.
			expect(filteredBindings).toHaveLength(1);
		});
	});

	describe('when searching for terms', () => {
		it('matches any bindings that contain the search term', () => {
			const filteredQuads = filterQuads(quadCollection, personResource.value);
			// Only two of the bindings rows should have a name with "o" in.
			expect(filteredQuads).toHaveLength(3);
		});
		it('is case insensitive when it filters', () => {
			const filteredQuads = filterQuads(quadCollection, personResource.value.toUpperCase());
			// Only two of the bindings rows should have a name with "o" in.
			expect(filteredQuads).toHaveLength(3);
		});
	});
});
