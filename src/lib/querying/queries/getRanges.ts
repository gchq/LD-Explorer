/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getRanges
 * @param {number} limit
 * @returns {string}
 *
 * Return ranges
 *
 */

export default { createQuery: getRanges, codeComment: CommonCodeComments.ChangeLimitInSettings };

function getRanges(limit = 100): string {
	return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?property ?range 
WHERE { ?property rdfs:range ?range . } 
LIMIT ${limit}`;
}
