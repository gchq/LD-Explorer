/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getDomains
 * @param {number} limit
 * @returns {string}
 *
 * Return domains
 *
 */

export default { createQuery: getDomains, codeComment: CommonCodeComments.ChangeLimitInSettings };

function getDomains(limit = 100): string {
	return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?property ?domain 
WHERE { ?property rdfs:domain ?domain . } 
LIMIT ${limit}`;
}
