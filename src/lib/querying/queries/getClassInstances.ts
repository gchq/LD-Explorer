/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getClassInstances
 * @param {string} iri
 * @param {number} limit
 * @returns {string}
 *
 * Return any resource declared to be an rdf:type of a given IRI.
 *
 */

export default {
	createQuery: getClassInstances,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getClassInstances(iri: string, limit = 100) {
	return `
SELECT DISTINCT ?instance
WHERE {
      ?instance a <${iri}> .
}
LIMIT ${limit}`;
}
