/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getClasses
 * @param {number?} limit
 * @returns {string}
 *
 * Return all base classes, which are defined here as classes which are not asserted to be sub-classes.
 * Also filters out anything where the parent class is an owl:Thing - this is because *every* user defined class
 * is a subclass of owl:Thing implicitly according to the spec (so, the one true base class for everything is an
 * owl:Thing but here we're trying to find all the classes that are at the top of the tree *except* for that one).
 *
 */

export default {
	createQuery: getBaseClasses,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getBaseClasses(limit = 100): string {
	return `
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?class
WHERE {
      ?s a ?class .
      FILTER NOT EXISTS { ?class rdfs:subClassOf ?parent . FILTER( ?parent != owl:Thing ) }
}
LIMIT ${limit}`;
}
