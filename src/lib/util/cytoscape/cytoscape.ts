/* (c) Crown Copyright GCHQ */

import type { ElementDefinition } from 'cytoscape';
import type { Prefix } from '$lib/types';
import type { Quad } from '@rdfjs/types';
import { abbreviateTermPrefix } from '$lib/util/term.utils';
import layout from './layout';
import style from './style';

const MAX_LABEL_LENGTH = 40;

type TermType = 'NamedNode' | 'BlankNode' | 'Literal' | 'Variable' | 'Quad';

export type LinkedDataElement = ElementDefinition & {
	data: { label: string; termType: TermType };
};

// TODO: This code is in need of a refactor, but is also potentially useful outside of this project.
// No burning reason to try and improve this here as the graphing / visualisation element is such a
// small part of what LD-Explorer actually does, but we definitely want to refactor if we ever extract.
export function getCytoscapeElementsForQuads(
	quads: Quad[],
	abbreviateTerms: boolean = false,
	prefixes: Prefix[] = []
): LinkedDataElement[] {
	const elements: LinkedDataElement[] = [];
	const resources = new Set<string>();

	// Get label, abbreviating if necessary
	function formatLabel(label: string) {
		return abbreviateTerms ? abbreviateTermPrefix(label, prefixes) : label;
	}

	// Add resource node to graph, ensuring duplicates are not added
	function addResourceNode(id: string, label: string, termType: TermType) {
		if (resources.has(id)) return;

		resources.add(id);
		elements.push({
			data: { id, label: formatLabel(label), termType }
		});
	}

	for (const [idx, { subject, predicate, object }] of quads.entries()) {
		if ((subject.termType as TermType) == 'Quad') {
			console.warn(
				'Graph contains a quoted triple - these are not supported for graph visualization.'
			);
			continue;
		}

		// Add subject as node - subjects will always be IRIs (either blank nodes or named nodes)
		addResourceNode(subject.value, subject.value, subject.termType);

		const edgeId = `E${idx}`;

		if (object.termType == 'NamedNode' || object.termType == 'BlankNode') {
			// Add named nodes or blank nodes from the OBJECT portion of triple
			addResourceNode(object.value, object.value, object.termType);
			elements.push({
				data: {
					id: edgeId,
					source: subject.value,
					target: object.value,
					label: formatLabel(predicate.value),
					termType: predicate.termType
				}
			});
		} else if (object.termType == 'Literal') {
			const literalId = `L${idx}`;
			elements.push({
				data: {
					id: literalId,
					label:
						object.value.length > MAX_LABEL_LENGTH
							? object.value.substring(0, MAX_LABEL_LENGTH - 3) + '...'
							: object.value,
					termType: object.termType
				}
			});
			elements.push({
				data: {
					id: edgeId,
					source: subject.value,
					target: literalId,
					label: formatLabel(predicate.value),
					termType: predicate.termType
				}
			});
		}
	}
	return elements;
}

export const cytoscapeSettings = {
	style,
	layout
};
