/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getSubclasses
 * @returns {string}
 *
 * Gets all subclasses for a given IRI
 *
 */

export default {
	createQuery: getSubclasses,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getSubclasses(iri: string, limit = 100) {
	return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

CONSTRUCT { ?subClass rdfs:subClassOf ?superClass . }
WHERE {
    ?subClass rdfs:subClassOf* <${iri}> .
    ?subClass rdfs:subClassOf ?superClass .
    FILTER (?subClass != <${iri}>)
}
LIMIT ${limit}
      `;
}
