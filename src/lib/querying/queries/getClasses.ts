/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getClasses
 * @param {number?} limit
 * @returns {string}
 *
 * Return any classes based on whether they are explicitly declared as owl or rdfs classes or
 * if there are any individuals which are asserted to be members of a resource via rdf:type.
 *
 */

export default { createQuery: getClasses, codeComment: CommonCodeComments.ChangeLimitInSettings };

function getClasses(limit = 100): string {
	return `
SELECT DISTINCT ?className
WHERE {
      { ?individual a ?className . }
      UNION
      { ?className a owl:Class . } 
      UNION
      { ?className a rdfs:Class . }
}
LIMIT ${limit}`;
}
