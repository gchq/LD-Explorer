/* (c) Crown Copyright GCHQ */

import type { ElementDefinition } from 'cytoscape';
import type { Prefix } from '$lib/types';
import type { Quad, Term } from '@rdfjs/types';
import { abbreviateTermPrefix } from '$lib/util/term.utils';
import layout from './layout';
import createCytoscapeStyles from './style';

const MAX_LABEL_LENGTH = 40;
const RDF_TYPE_IRI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';

type TermType = 'NamedNode' | 'BlankNode' | 'Literal' | 'Variable' | 'Quad' | 'DefaultGraph';

export type LinkedDataElement = ElementDefinition & {
	data: {
		id?: string;
		label: string;
		termType: TermType;
		parent?: string;
		isGraph?: boolean;
		source?: string;
		target?: string;
	};
};

// TODO: This code is in need of a refactor, but is also potentially useful outside of this project.
// No burning reason to try and improve this here as the graphing / visualisation element is such a
// small part of what LD-Explorer actually does, but we definitely want to refactor if we ever extract.
export function getCytoscapeElementsForQuads(
	quads: Quad[],
	abbreviateTerms: boolean = false,
	prefixes: Prefix[] = [],
	squashRdfType: boolean = false
): LinkedDataElement[] {
	const elements: LinkedDataElement[] = [];
	const resources = new Set<string>();
	const graphs = new Set<string>();

	// Get label, abbreviating if necessary
	function formatLabel(label: string) {
		return abbreviateTerms ? abbreviateTermPrefix(label, prefixes) : label;
	}

	const rdfTypesBySubject = new Map<string, Set<string>>();
	if (squashRdfType) {
		for (const { subject, predicate, object, graph } of quads) {
			if (
				(subject.termType as TermType) !== 'Quad' &&
				predicate.value === RDF_TYPE_IRI &&
				(object.termType === 'NamedNode' || object.termType === 'BlankNode')
			) {
				const subjectId = contextualResourceId(subject, graph);
				const types = rdfTypesBySubject.get(subjectId) ?? new Set<string>();
				types.add(formatLabel(object.value));
				rdfTypesBySubject.set(subjectId, types);
			}
		}
	}

	function addGraphNode(graph: Term) {
		if (graph.termType === 'DefaultGraph') return;
		const id = graphId(graph);
		if (graphs.has(id)) return;
		graphs.add(id);
		elements.push({
			data: {
				id,
				label: formatLabel(graph.value),
				termType: graph.termType as TermType,
				isGraph: true
			}
		});
	}

	// Add resource node to graph, ensuring duplicates are not added within the same RDF graph.
	function addResourceNode(
		id: string,
		label: string,
		termType: TermType,
		parent: string | undefined = undefined
	) {
		if (resources.has(id)) return;

		resources.add(id);
		const types = rdfTypesBySubject.get(id);
		const formattedLabel = formatLabel(label);
		elements.push({
			data: {
				id,
				label: types?.size ? `${formattedLabel} (a ${[...types].join(', ')})` : formattedLabel,
				termType,
				...(parent ? { parent } : {})
			}
		});
	}

	for (const [idx, { subject, predicate, object, graph }] of quads.entries()) {
		if ((subject.termType as TermType) == 'Quad') {
			console.warn(
				'Graph contains a triple term - these are not supported for graph visualization.'
			);
			continue;
		}

		addGraphNode(graph);
		const parent = graph.termType === 'DefaultGraph' ? undefined : graphId(graph);

		// Add subject as node - subjects will always be IRIs (either blank nodes or named nodes)
		const subjectId = contextualResourceId(subject, graph);
		addResourceNode(subjectId, subject.value, subject.termType, parent);

		if (
			squashRdfType &&
			predicate.value === RDF_TYPE_IRI &&
			(object.termType === 'NamedNode' || object.termType === 'BlankNode')
		) {
			continue;
		}

		const edgeId = contextualElementId(`E${idx}`, graph);

		if (object.termType == 'NamedNode' || object.termType == 'BlankNode') {
			// Add named nodes or blank nodes from the OBJECT portion of triple
			const objectId = contextualResourceId(object, graph);
			addResourceNode(objectId, object.value, object.termType, parent);
			elements.push({
				data: {
					id: edgeId,
					source: subjectId,
					target: objectId,
					label: formatLabel(predicate.value),
					termType: predicate.termType
				}
			});
		} else if (object.termType == 'Literal') {
			const literalId = contextualElementId(`L${idx}`, graph);
			elements.push({
				data: {
					id: literalId,
					label:
						object.value.length > MAX_LABEL_LENGTH
							? object.value.substring(0, MAX_LABEL_LENGTH - 3) + '...'
							: object.value,
					termType: object.termType,
					...(parent ? { parent } : {})
				}
			});
			elements.push({
				data: {
					id: edgeId,
					source: subjectId,
					target: literalId,
					label: formatLabel(predicate.value),
					termType: predicate.termType
				}
			});
		}
	}
	return elements;
}

function resourceId(term: Term): string {
	return `${term.termType}:${term.value}`;
}

function graphId(graph: Term): string {
	return `G:${resourceId(graph)}`;
}

function contextualElementId(id: string, graph: Term): string {
	return graph.termType === 'DefaultGraph' ? id : `${graphId(graph)}|${id}`;
}

function contextualResourceId(term: Term, graph: Term): string {
	return contextualElementId(resourceId(term), graph);
}

type CytoscapeSettingsOpts = {
	darkMode: boolean;
};

export const cytoscapeSettings = ({ darkMode }: CytoscapeSettingsOpts) => {
	return {
		style: createCytoscapeStyles(darkMode),
		layout
	};
};
