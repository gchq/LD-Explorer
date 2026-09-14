/* (c) Crown Copyright GCHQ */

import { QueryEngine } from '@comunica/query-sparql';
import { DataFactory, Store } from 'n3';
import {
	describeResource,
	getAppearances,
	getBaseClasses,
	getClassInstances,
	getClasses,
	getDomains,
	getIndividuals,
	getLabels,
	getProperties,
	getRanges,
	getSubclasses,
	getSuperclasses,
	getTriples
} from '.';

const { literal, namedNode, quad } = DataFactory;
const RDF_TYPE = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
const RDF_PROPERTY = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property');
const RDFS_CLASS = namedNode('http://www.w3.org/2000/01/rdf-schema#Class');
const RDFS_DOMAIN = namedNode('http://www.w3.org/2000/01/rdf-schema#domain');
const RDFS_LABEL = namedNode('http://www.w3.org/2000/01/rdf-schema#label');
const RDFS_RANGE = namedNode('http://www.w3.org/2000/01/rdf-schema#range');
const RDFS_SUBCLASS = namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf');

const person = namedNode('http://example.org/Person');
const student = namedNode('http://example.org/Student');
const knows = namedNode('http://example.org/knows');
const alice = namedNode('http://example.org/Alice');
const bob = namedNode('http://example.org/Bob');
const ontologyGraph = namedNode('http://example.org/ontology');
const dataGraph = namedNode('http://example.org/data');

const store = new Store([
	quad(person, RDF_TYPE, RDFS_CLASS, ontologyGraph),
	quad(student, RDF_TYPE, RDFS_CLASS, ontologyGraph),
	quad(student, RDFS_SUBCLASS, person, ontologyGraph),
	quad(knows, RDF_TYPE, RDF_PROPERTY, ontologyGraph),
	quad(knows, RDFS_DOMAIN, person, ontologyGraph),
	quad(knows, RDFS_RANGE, person, ontologyGraph),
	quad(alice, RDF_TYPE, student, dataGraph),
	quad(alice, knows, bob, dataGraph),
	quad(alice, RDFS_LABEL, literal('Alice', 'en'), dataGraph),
	quad(bob, RDF_TYPE, person, dataGraph)
]);

const engine = new QueryEngine();
const context = { sources: [store], unionDefaultGraph: false };

async function values(query: string, variable: string): Promise<string[]> {
	const stream = await engine.queryBindings(query, context);
	return (await stream.toArray())
		.map((bindings) => bindings.get(variable)?.value)
		.filter((value): value is string => value !== undefined);
}

async function quadsFor(query: string) {
	return (await engine.queryQuads(query, context)).toArray();
}

describe('exploration queries with named-graph-only data', () => {
	it('finds classes', async () => {
		expect(await values(getClasses.createQuery(), 'className')).toEqual(
			expect.arrayContaining([person.value, student.value])
		);
	});

	it('finds class instances', async () => {
		expect(await values(getClassInstances.createQuery(student.value), 'instance')).toContain(
			alice.value
		);
	});

	it('finds individuals', async () => {
		expect(await values(getIndividuals.createQuery(), 'individual')).toEqual(
			expect.arrayContaining([alice.value, bob.value])
		);
	});

	it('finds properties', async () => {
		expect(await values(getProperties.createQuery(), 'propertyName')).toContain(knows.value);
	});

	it('finds labels', async () => {
		expect(await values(getLabels.createQuery(), 'resource')).toContain(alice.value);
	});

	it('finds domains and ranges', async () => {
		expect(await values(getDomains.createQuery(), 'property')).toContain(knows.value);
		expect(await values(getRanges.createQuery(), 'property')).toContain(knows.value);
	});

	it('finds base classes using subclass relationships in named graphs', async () => {
		const classes = await values(getBaseClasses.createQuery(), 'class');
		expect(classes).toContain(person.value);
		expect(classes).not.toContain(student.value);
	});

	it('finds subclass and superclass relationships', async () => {
		const subclasses = await quadsFor(getSubclasses.createQuery(person.value));
		expect(subclasses.some((result) => result.subject.equals(student))).toBe(true);
		expect(await values(getSuperclasses.createQuery(student.value), 'superClass')).toContain(
			person.value
		);
	});

	it('describes a resource from a named graph', async () => {
		const description = await quadsFor(describeResource.createQuery(alice.value));
		expect(description.some((result) => result.predicate.equals(knows))).toBe(true);
	});

	it('finds resource appearances in named graphs', async () => {
		const appearances = await quadsFor(getAppearances.createQuery(alice.value));
		expect(appearances.some((result) => result.predicate.equals(knows))).toBe(true);
	});

	it('returns triples from named graphs', async () => {
		const triples = await quadsFor(getTriples.createQuery());
		expect(triples.some((result) => result.predicate.equals(knows))).toBe(true);
	});
});
