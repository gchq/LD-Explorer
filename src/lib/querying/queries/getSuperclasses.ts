/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getSuperclasses
 * @param {string} iri
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Gets all superclasses for a given IRI, optionally also searching named graphs.
 *
 */

export default {
	createQuery: getSuperclasses,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getSuperclasses(iri: string, limit = 100, queryForNamedGraphs = false) {
	return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?superClass
WHERE {
    {
        <${iri}> rdfs:subClassOf* ?superClass .
        ?subClass rdfs:subClassOf ?superClass .
    }
    ${
			queryForNamedGraphs
				? `UNION
    {
        GRAPH ?g {
            <${iri}> rdfs:subClassOf* ?superClass .
            ?subClass rdfs:subClassOf ?superClass .
        }
    }`
				: ''
		}
    FILTER (?superClass != <${iri}>)
}
LIMIT ${limit}`;
}
