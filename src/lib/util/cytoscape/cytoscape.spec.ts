/* (c) Crown Copyright GCHQ */

import { type LinkedDataElement, getCytoscapeElementsForQuads } from './cytoscape';
import { DataFactory } from 'n3';
const { quad, namedNode, literal } = DataFactory;

describe(getCytoscapeElementsForQuads, () => {
	describe('when provided with a triple whose object portion is literal', () => {
		const bob = namedNode('#Bob');
		const hasName = namedNode('#hasName');
		const bobName = literal('Bob');
		const triple = [quad(bob, hasName, bobName)];
		let result: LinkedDataElement[];

		beforeEach(() => {
			result = getCytoscapeElementsForQuads(triple);
		});

		it('produces three cytoscape elements', () => {
			expect(result).toHaveLength(3);
		});

		describe('the subject portion of the triple', () => {
			let el: LinkedDataElement;

			beforeEach(() => {
				el = result.find((r) => r.data.id == bob.value) as LinkedDataElement;
			});

			it('is a named node', () => {
				expect(el.data.termType).toEqual('NamedNode');
			});

			it('is labelled with its IRI', () => {
				expect(el.data.label).toEqual(bob.value);
			});
		});

		describe('the object portion of the triple', () => {
			let el: LinkedDataElement;

			beforeEach(() => {
				// Literals ID is an auto incrementing ID that starts E0, E1, E2...
				el = result.find((r) => r.data.id == 'L0') as LinkedDataElement;
			});

			it('is a literal', () => {
				expect(el.data.termType).toEqual('Literal');
			});

			it('is labelled with the literal value', () => {
				expect(el.data.label).toEqual(bobName.value);
			});
		});

		describe(`the predicate portion of the triple (${hasName.value})`, () => {
			let el: LinkedDataElement;
			beforeEach(() => {
				// Predicate/property portion's ID is an auto incrementing ID that starts E0, E1, E2...
				el = result.find((r) => r.data.id == 'E0') as LinkedDataElement;
			});

			it('is labelled correctly', () => {
				expect(el.data.label).toEqual(hasName.value);
			});

			it('is a named node', () => {
				expect(el.data.termType).toEqual('NamedNode');
			});

			it('has bob as the source', () => {
				expect(el.data.source).toEqual(bob.value);
			});

			it('has the Bob name literal', () => {
				expect(el.data.target).toEqual('L0');
			});
		});
	});

	describe('when provided with a triple whose object portion is named node', () => {
		const alice = namedNode('#Alice');
		const triple = [quad(namedNode('#Bob'), namedNode('#knows'), alice)];
		let result: LinkedDataElement[];

		beforeEach(() => {
			result = getCytoscapeElementsForQuads(triple);
		});

		describe('the object portion of the triple', () => {
			let el: LinkedDataElement;

			beforeEach(() => {
				el = result.find((r) => r.data.id == alice.value) as LinkedDataElement;
			});

			it('is a named Node', () => {
				expect(el.data.termType).toEqual('NamedNode');
			});

			it('is labelled with the correct value', () => {
				expect(el.data.label).toEqual(alice.value);
			});
		});
	});

	describe('when given extremely long strings as literals', () => {
		const triple = [
			quad(
				namedNode('#Bob'),
				namedNode('#hasDescription'),
				literal(
					'My goodness this is an extremely long description of Bob, someone really went to town on this one!'
				)
			)
		];

		let result: LinkedDataElement[];
		let el: LinkedDataElement;

		beforeEach(() => {
			result = getCytoscapeElementsForQuads(triple);
			el = result.find((r) => r.data.id == 'L0') as LinkedDataElement;
		});

		it('truncates the string to 40 characters and adds elipsis', () => {
			expect(el.data.label).toHaveLength(40);
			expect(el.data.label).toEqual('My goodness this is an extremely long...');
		});
	});

	describe('when a triple term is included in the document', () => {
		const bobAPerson = quad(
			namedNode('#Bob'),
			namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
			namedNode('#Bob')
		);

		const triple = [quad(bobAPerson, namedNode('#knows'), namedNode('#Alice'))];

		afterEach(() => {
			vi.clearAllMocks();
		});

		it('Writes an appropriate warning to the console', () => {
			const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			getCytoscapeElementsForQuads(triple);
			expect(warn).toHaveBeenCalledOnce();
			expect(warn).toHaveBeenCalledWith(expect.stringContaining('not supported'));
		});
	});

	describe('when asked to abbreviate common prefixes', () => {
		const triple = [
			quad(
				namedNode('#Bob'),
				namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
				namedNode('#Person')
			)
		];

		it('abbreviates common prefixes (in this case, the rdf:type IRI)', () => {
			const result = getCytoscapeElementsForQuads(triple, true, [
				{
					label: 'rdf',
					iri: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
				}
			]);
			const el = result.find((r) => r.data.id == 'E0') as LinkedDataElement;
			expect(el.data.label).toEqual('rdf:type');
		});
	});

	describe('provided with multiple triples containing the same IRI', () => {
		const bob = namedNode('#Bob');
		const triples = [
			quad(bob, namedNode('#hasName'), literal('Bob')),
			quad(bob, namedNode('#hasDescription'), literal('Bobs Description'))
		];

		it('only includes the IRI once', () => {
			const result = getCytoscapeElementsForQuads(triples);
			const el = result.filter((r) => r.data.id == bob.value) as LinkedDataElement[];

			expect(el).toHaveLength(1);
		});
	});
});
