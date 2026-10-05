/* (c) Crown Copyright GCHQ */

/**
 * getAppearances
 * @param {string} iri
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Return any triples where the given IRI appears as subject, predicate or object,
 * optionally also searching named graphs.
 *
 */

import { CommonCodeComments } from '../sparqlUtils';

export default {
	createQuery: getAppearances,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getAppearances(iri: string, limit = 100, queryForNamedGraphs = false) {
	return `
CONSTRUCT {
      <${iri}> ?p0 ?o0 .
      ?s1 <${iri}> ?o1 .
      ?s2 ?p2 <${iri}> .
}
WHERE {
      { <${iri}> ?p0 ?o0 }
${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { <${iri}> ?p0 ?o0 } }` : ''}
UNION
      { ?s1 <${iri}> ?o1 }
${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { ?s1 <${iri}> ?o1 } }` : ''}
UNION
      { ?s2 ?p2 <${iri}> }
${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { ?s2 ?p2 <${iri}> } }` : ''}
}
LIMIT ${limit}`;
}
