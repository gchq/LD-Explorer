/* (c) Crown Copyright GCHQ */

/**
 * describeResource
 * @param {string} iri
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Return outgoing statements for an IRI from the default graph and optionally named graphs.
 *
 */

export default { createQuery: describeResource };

function describeResource(iri: string, queryForNamedGraphs = false) {
	return `CONSTRUCT { <${iri}> ?p ?o }
WHERE {
      { <${iri}> ?p ?o }
      ${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { <${iri}> ?p ?o } }` : ''}
}`;
}
