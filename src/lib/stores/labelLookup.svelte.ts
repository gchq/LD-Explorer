/* (c) Crown Copyright GCHQ */

/**
 * WORK IN PROGRESS - DO NOT MERGE
 *
 * TODO
 * ====
 * - Make functionality optional via settings
 * - Write unit tests
 * - Write e2e tests
 *
 */

import { get } from 'svelte/store';
import { engine } from '$lib/querying/engine';
import { sourceList } from '$stores/sources/sources.store';
import defaultLabels from '$lib/data/labels.json';

interface LabelLookup {
	[iri: string]: string;
}

// Max number of labels allowed in lookup to preserve browser performance. TODO: Currently,
// the algorithm just flushes the entire lookup if this number is exceeded but we could do
// something smarter than this (e.g. flush the oldest or least-used labels)
const MAX_LABELS = 100_000; // 100k is just an arbitrarily high number.
let labelLookup = $state<LabelLookup>(defaultLabels);

/**
 * Create a SPARQL query that finds rdfs labels for multiple terms.
 */
function createSparqlQueryForLabels(terms: string[], lang = 'en') {
	return `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    
    SELECT DISTINCT ?entity ?label
    WHERE {
	 		VALUES ?entity { ${terms.map((term) => `<${term}> `).join(' ')} }
          	?entity rdfs:label ?label
          	FILTER (LANGMATCHES(LANG(?label), "${lang}") || LANG(?label) = "")
    }`;
}

/**
 * Batching variables
 */
const BATCH_SIZE = 100;
const labelQueue: string[] = [];
let timeoutId: ReturnType<typeof setTimeout>;

/**
 * enqueueFetch
 *
 * Request a fetch for a single label. In this application, the likelihood of multiple labels being
 * fetched in quick succession is extremely high (this will pretty much always happen) so this function
 * implements a batching algorithm here to ensure that remote services aren't wastefully
 * being hammered with hundreds of requests for labels.
 *
 * When the label is eventually found, it's placed onto the label lookup (see `processLabels` for details).
 *
 * @param term A string representing the term to look up.
 * @returns {Promise<string | null>} A that term's label
 */
function enqueueLabel(term: string): void {
	labelQueue.push(term);
	clearTimeout(timeoutId);

	// Fetch immediately if batch size reached or overflowed
	if (labelQueue.length >= BATCH_SIZE) {
		processLabelsQueue();
		return;
	}

	// debounce processing.
	timeoutId = setTimeout(processLabelsQueue, 10);
}

/**
 * processLabelsFromQueue
 *
 * Empties the label queue of (BATCH_SIZE) labels and puts them into the labels lookup.
 * Templates will detect these changes and update automatically due to Svelte's reactivity.
 */
async function processLabelsQueue() {
	if (Object.keys(labelLookup).length > MAX_LABELS) {
		// currently we're just flushing the whole label lookup if it goes over the maximum -
		// whilst this does serve the purpose of preserving browser performance, we could do
		// something smarter than this.
		flushLookup();
	}

	const labelsToFetch = labelQueue.splice(0, BATCH_SIZE);

	const sparql = createSparqlQueryForLabels(labelsToFetch);

	const results = await engine.queryBindings(sparql, {
		sources: get(sourceList),
		readonly: true,
		lenient: true
	});

	for await (const result of results) {
		const iri = result.get('entity')?.value;
		const label = result.get('label')?.value;

		if (iri?.length && label?.length) {
			labelLookup[iri] = label;
		}
	}
}

/**
 * labelFor
 *
 * Looks for the label in the lookup. If this is not found, the function
 * enqueues a fetch to check for the label in any active data sources.
 *
 * This is the only public function within this module.
 *
 * @param term the term to find a label for.
 * @param defaultValue optional value to return if no value found.
 * @returns {Promise<string>} the label (if found) or the default value (if given) - if neither is found,
 * it'll just echo back the passed-in term.
 */

interface LabelForOptions {
	defaultValue?: string;
	lazy?: boolean;
}

export async function labelFor(
	term: string,
	{ defaultValue = undefined, lazy = true }: LabelForOptions = {}
) {
	if (!lazy) {
		await enqueueLabel(term);
		await processLabelsQueue();
	}

	return labelLookup[term] || enqueueLabel(term) || defaultValue || term;
}

export function flushLookup() {
	labelLookup = {};
}
