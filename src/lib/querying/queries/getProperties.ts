/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getProperties
 * @param {number?} limit
 * @returns {string}
 *
 * Return any properties.
 *
 */

export default {
	createQuery: getProperties,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getProperties(limit = 100): string {
	return `
SELECT DISTINCT ?propertyName
WHERE {
      { ?s ?propertyName ?o }
      UNION
      { ?propertyName a owl:ObjectProperty . } 
      UNION
      { ?propertyName a owl:DatatypeProperty . }
      UNION
      { ?propertyName a rdf:Property . }
} 
LIMIT ${limit}`;
}
