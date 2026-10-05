/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getProperties
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Return any properties, optionally also searching named graphs.
 *
 */

export default {
	createQuery: getProperties,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getProperties(limit = 100, queryForNamedGraphs = false): string {
	return `
SELECT DISTINCT ?propertyName
WHERE {
      {${whereClause}}
      ${queryForNamedGraphs ? namedGraphExtension : ''}
}
LIMIT ${limit}`;
}

const whereClause = `
            { ?s ?propertyName ?o }
            UNION
            { ?propertyName a owl:ObjectProperty . }
            UNION
            { ?propertyName a owl:DatatypeProperty . }
            UNION
            { ?propertyName a rdf:Property . }`;

const namedGraphExtension = `UNION
      {
            GRAPH ?g {
                  ${whereClause}
            }
      }`;
