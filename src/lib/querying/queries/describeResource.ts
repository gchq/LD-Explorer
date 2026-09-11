/* (c) Crown Copyright GCHQ */

/**
 * describeResource
 * @returns {string}
 *
 * Return outgoing statements for an IRI from the default graph and named graphs.
 *
 */

export default { createQuery: describeResource };

function describeResource(iri: string) {
	return `CONSTRUCT { <${iri}> ?p ?o }
WHERE {
      { <${iri}> ?p ?o }
      UNION
      { GRAPH ?ldExplorerGraph { <${iri}> ?p ?o } }
}`;
}
