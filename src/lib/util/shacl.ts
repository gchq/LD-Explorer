/* (c) Crown Copyright GCHQ */

import type { Term } from '@rdfjs/types';
import type { LocalSource } from '$stores/sources/local-sources.store';
import { Parser, Store as N3Store } from 'n3';
import SHACLValidator from 'rdf-validate-shacl';

const SHACL_NAMESPACE = 'http://www.w3.org/ns/shacl#';

export interface ShaclValidationResult {
	focusNode: string;
	path: string;
	severity: string;
	message: string;
	sourceConstraintComponent: string;
	sourceShape: string;
}

export interface ShaclValidationSummary {
	conforms: boolean;
	results: ShaclValidationResult[];
	dataQuadCount: number;
	shapeQuadCount: number;
	sourceCount: number;
}

function displayTerm(term: Term | undefined): string {
	if (!term) return '';
	if (term.termType === 'BlankNode') return `_:${term.value}`;
	if (term.termType === 'Literal') return term.value;
	if (term.termType === 'NamedNode' && term.value.startsWith(SHACL_NAMESPACE)) {
		return `sh:${term.value.slice(SHACL_NAMESPACE.length)}`;
	}
	return term.value;
}

export function parseShaclShapes(document: string): N3Store {
	const shapes = new N3Store(new Parser().parse(document));
	if (shapes.size === 0) throw new Error('The SHACL shapes document contains no RDF statements.');
	return shapes;
}

export function combineEnabledLocalSources(sources: LocalSource[]): {
	dataset: N3Store;
	sourceCount: number;
} {
	const enabledSources = sources.filter((source) => source.enabled && source.n3Store);
	if (enabledSources.length === 0) throw new Error('No enabled local data sources are available.');

	const dataset = new N3Store();
	for (const source of enabledSources) {
		const store = source.n3Store as N3Store;
		dataset.addQuads(store.getQuads(null, null, null, null));
	}
	return { dataset, sourceCount: enabledSources.length };
}

export async function validateLocalSourcesWithShacl(
	sources: LocalSource[],
	shapesDocument: string
): Promise<ShaclValidationSummary> {
	const shapes = parseShaclShapes(shapesDocument);
	const { dataset, sourceCount } = combineEnabledLocalSources(sources);
	const report = await new SHACLValidator(shapes).validate(dataset);

	return {
		conforms: report.conforms,
		results: report.results.map((result) => ({
			focusNode: displayTerm(result.focusNode),
			path: displayTerm(result.path),
			severity: displayTerm(result.severity),
			message: result.message.map(displayTerm).join('; ') || 'SHACL constraint violation',
			sourceConstraintComponent: displayTerm(result.sourceConstraintComponent),
			sourceShape: displayTerm(result.sourceShape)
		})),
		dataQuadCount: dataset.size,
		shapeQuadCount: shapes.size,
		sourceCount
	};
}
