/**
 * WORK IN PROGRESS - DO NOT MERGE
 *
 * This is a work-in-progress label store for displaying RDFS labels in LD Explorer.
 * Currently the functionality does work, but it tanks performance as it goes off
 * to find the labels individually on-request. If a page contains 100 labels, that means
 * 100 requests which is wasteful.
 *
 * Before this goes live, we should implement a batching algorithm to look for multiple labels at
 * once.
 *
 * Ideally we need to make this functionality optional too as not everyone will want it.
 */

import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import { engine } from '$lib/querying/engine';
import { sourceList } from '$stores/sources/sources.store';

interface LabelLookup {
	[iri: string]: string;
}

/**
 * Maybe we could put some default labels for some really popular / common
 * RDF terms, save going and looking for them remotely.
 */
const defaultLabels: LabelLookup = {
	'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': 'Type',
	'http://www.w3.org/2000/01/rdf-schema#label': 'Label',
	'http://www.w3.org/2000/01/rdf-schema#comment': 'Comment',
	'http://www.w3.org/2000/01/rdf-schema#subClassOf': 'Subclass of'
};

const labels = writable(defaultLabels);

/**
 * Function that goes off and finds a label for a particular term
 */
function createSparqlQuery(term: string, lang = 'en') {
	return `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    
    SELECT DISTINCT ?label
    WHERE {
          <${term}> rdfs:label ?label
          FILTER (LANGMATCHES(LANG(?label), "${lang}}") || LANG(?label) = "")
    } 
    LIMIT 1`;
}

/**
 * fetchLabel
 *
 * @param term A string representing the term to look up.
 * @returns {Promise<string | null>} A that term's label
 */
async function fetchLabel(term: string): Promise<string | null> {
	const sparql = createSparqlQuery(term);

	const result = await engine.queryBindings(sparql, {
		sources: get(sourceList),
		readonly: true,
		lenient: true
	});

	// This would normally be a non-performat way of doing things, but our
	// query here is guarenteed to return at most one result, so it's fine.
	const label = await result.toArray();

	if (label.length) {
		const labelValue = label[0].get('label')?.value as string;

		// Write the found label away to the lookup to save having to fetch it
		// next time.
		labels.update((current) => ({ ...current, [term]: labelValue }));

		return labelValue;
	} else {
		// No label existed. We *could* write this fact away to the lookup too,
		// but new data sources (and new data) might have been added remotely since
		// last time we checked.
		return null;
	}
}

/**
 * labelFor
 *
 * Looks for the label in the lookup, goes off to look for it in the data
 * sources if it's not there (this is for performance reasons, as the data
 * source might be remote and expensive to query)
 *
 * This is the only public function within this API.
 *
 * @param term the term to find a label for
 * @returns {Promise<string>} the label.
 */
export async function labelFor(term: string) {
	return get(labels)[term] || (await fetchLabel(term)) || term;
}
