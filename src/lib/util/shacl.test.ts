/* (c) Crown Copyright GCHQ */

import { Parser, Store as N3Store } from 'n3';
import type { LocalSource } from '$stores/sources/local-sources.store';
import {
	combineEnabledLocalSources,
	parseShaclShapes,
	validateLocalSourcesWithShacl
} from './shacl';

const shapes = `
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix ex: <http://example.org/> .

ex:PersonShape a sh:NodeShape ;
    sh:targetClass ex:Person ;
    sh:property [
        sh:path ex:name ;
        sh:minCount 1
    ] .
`;

function localSource(name: string, document: string, enabled = true): LocalSource {
	return {
		id: name,
		name,
		description: '',
		type: 'LOCAL',
		enabled,
		n3Store: new N3Store(new Parser().parse(document))
	};
}

describe('SHACL validation', () => {
	it('parses SHACL shapes from RDF text', () => {
		expect(parseShaclShapes(shapes).size).toBeGreaterThan(0);
	});

	it('rejects an empty shapes document', () => {
		expect(() => parseShaclShapes('')).toThrow('contains no RDF statements');
	});

	it('combines only enabled local sources', () => {
		const { dataset, sourceCount } = combineEnabledLocalSources([
			localSource(
				'enabled',
				'<http://example.org/A> <http://example.org/p> <http://example.org/B> .'
			),
			localSource(
				'disabled',
				'<http://example.org/C> <http://example.org/p> <http://example.org/D> .',
				false
			)
		]);

		expect(sourceCount).toBe(1);
		expect(dataset.size).toBe(1);
	});

	it('rejects validation when no local source is enabled', async () => {
		await expect(
			validateLocalSourcesWithShacl([localSource('disabled', '', false)], shapes)
		).rejects.toThrow('No enabled local data sources');
	});

	it('reports conforming data', async () => {
		const report = await validateLocalSourcesWithShacl(
			[
				localSource(
					'people',
					'@prefix ex: <http://example.org/> . ex:Alice a ex:Person ; ex:name "Alice" .'
				)
			],
			shapes
		);

		expect(report.conforms).toBe(true);
		expect(report.results).toHaveLength(0);
		expect(report.sourceCount).toBe(1);
		expect(report.dataQuadCount).toBe(2);
	});

	it('returns useful details for constraint violations', async () => {
		const report = await validateLocalSourcesWithShacl(
			[localSource('people', '@prefix ex: <http://example.org/> . ex:Alice a ex:Person .')],
			shapes
		);

		expect(report.conforms).toBe(false);
		expect(report.results).toHaveLength(1);
		expect(report.results[0]).toMatchObject({
			focusNode: 'http://example.org/Alice',
			path: 'http://example.org/name',
			severity: 'sh:Violation',
			message: 'Less than 1 values',
			sourceConstraintComponent: 'sh:MinCountConstraintComponent'
		});
	});
});
