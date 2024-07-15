/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getLabels
 * @param {number?} limit
 * @returns {string}
 *
 * Return any rdfs:labels and the resources they are associated to.
 *
 */

export default { createQuery: getLabels, codeComment: CommonCodeComments.ChangeLimitInSettings };

function getLabels(limit = 100, languageTag = 'en'): string {
	return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?resource ?label
WHERE {
      ?resource rdfs:label ?label
      FILTER (LANGMATCHES(LANG(?label), "${languageTag}"))
} 
LIMIT ${limit}`;
}
