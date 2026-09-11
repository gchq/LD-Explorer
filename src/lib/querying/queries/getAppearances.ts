/* (c) Crown Copyright GCHQ */

/**
 * getClassInstances
 * @param {string} iri
 * @param {number} limit
 * @returns {string}
 *
 * Return any resource declared to be an rdf:type of a given IRI.
 *
 */

import { CommonCodeComments } from '../sparqlUtils';

export default {
	createQuery: getAppearances,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getAppearances(iri: string, limit = 100) {
	return `
CONSTRUCT {
      <${iri}> ?p0 ?o0 .
      ?s1 <${iri}> ?o1 .
      ?s2 ?p2 <${iri}> .
}
WHERE {
      { <${iri}> ?p0 ?o0 }
UNION
      { GRAPH ?ldExplorerGraph { <${iri}> ?p0 ?o0 } }
UNION
      { ?s1 <${iri}> ?o1 }
UNION
      { GRAPH ?ldExplorerGraph { ?s1 <${iri}> ?o1 } }
UNION
      { ?s2 ?p2 <${iri}> }
UNION
      { GRAPH ?ldExplorerGraph { ?s2 ?p2 <${iri}> } }
}
LIMIT ${limit}`;
}
