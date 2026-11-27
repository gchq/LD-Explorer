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

function getClasses(limit = 100, queryForNamedGraphs = false): string {
	return `
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?className
WHERE {
      {${whereClause}}
      ${queryForNamedGraphs ? namedGraphExtension : ''}
}
LIMIT ${limit}`;
}

const whereClause = `
      { ?individual a ?className . }
      UNION
      { ?className a owl:Class . }
      UNION
      { ?className a rdfs:Class . }`;

const namedGraphExtension = `UNION
      {
            GRAPH ?g {
                  ${whereClause}
            }
      }
`;
