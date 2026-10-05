/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getClassInstances
 * @param {string} iri
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Return any resource declared to be an rdf:type of a given IRI,
 * optionally also searching named graphs.
 *
 */

export default {
	createQuery: getClassInstances,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getClassInstances(iri: string, limit = 100, queryForNamedGraphs = false) {
	return `
SELECT DISTINCT ?instance
WHERE {
      { ?instance a <${iri}> . }
      ${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { ?instance a <${iri}> . } }` : ''}
}
LIMIT ${limit}`;
}
