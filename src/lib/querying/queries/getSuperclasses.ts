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
	createQuery: getSuperclasses,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getSuperclasses(iri: string, limit = 100) {
	return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?superClass 
WHERE {
    <${iri}> rdfs:subClassOf* ?superClass .
    ?subClass rdfs:subClassOf ?superClass .
    FILTER (?superClass != <${iri}>)
}
LIMIT ${limit}`;
}
