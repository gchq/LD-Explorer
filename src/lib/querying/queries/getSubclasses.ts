/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getSubclasses
 * @param {string} iri
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Gets all subclasses for a given IRI, optionally also searching named graphs.
 *
 */

export default {
	createQuery: getSubclasses,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getSubclasses(iri: string, limit = 100, queryForNamedGraphs = false) {
	return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

CONSTRUCT { ?subClass rdfs:subClassOf ?superClass . }
WHERE {
    {
        ?subClass rdfs:subClassOf* <${iri}> .
        ?subClass rdfs:subClassOf ?superClass .
    }
    ${
			queryForNamedGraphs
				? `UNION
    {
        GRAPH ?g {
            ?subClass rdfs:subClassOf* <${iri}> .
            ?subClass rdfs:subClassOf ?superClass .
        }
    }`
				: ''
		}
    FILTER (?subClass != <${iri}>)
}
LIMIT ${limit}
      `;
}
