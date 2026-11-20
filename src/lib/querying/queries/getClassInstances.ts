/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getClassInstances
 * @param {string} iri
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @param {boolean} includeSubclasses
 * @returns {string}
 *
 * Return any resource declared to be an rdf:type of a given IRI,
 * optionally also searching named graphs.
 *
 * When includeSubclasses is true, also returns individuals whose rdf:type
 * is a subclass (at any depth) of the given IRI, using rdfs:subClassOf*.
 * The type triple and the subClassOf chain are matched independently so that
 * ontology and data can live in separate named graphs.
 *
 */

export default {
	createQuery: getClassInstances,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getClassInstances(
	iri: string,
	limit = 100,
	queryForNamedGraphs = false,
	includeSubclasses = false
) {
	if (includeSubclasses) {
		return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?instance
WHERE {
      {
          ?instance a ?type .
          ?type rdfs:subClassOf* <${iri}> .
      }
      ${
				queryForNamedGraphs
					? `UNION
      {
          GRAPH ?g {
              ?instance a ?type .
              ?type rdfs:subClassOf* <${iri}> .
          }
      }`
					: ''
			}
}
LIMIT ${limit}`;
	}

	return `
SELECT DISTINCT ?instance
WHERE {
      { ?instance a <${iri}> . }
      ${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { ?instance a <${iri}> . } }` : ''}
}
LIMIT ${limit}`;
}
