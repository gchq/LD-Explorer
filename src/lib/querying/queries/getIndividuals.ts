/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getIndividuals
 * @param {number?} limit
 * @returns {string}
 *
 * Return any individuals (instances of a class) and their associated class.
 *
 */

export default {
	createQuery: getIndividuals,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getIndividuals(limit = 100): string {
	return `
SELECT DISTINCT ?individual ?className
WHERE {
      ?individual a ?className
} 
LIMIT ${limit}`;
}
