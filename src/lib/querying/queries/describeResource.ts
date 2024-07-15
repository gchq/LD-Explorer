/* (c) Crown Copyright GCHQ */

/**
 * describeResource
 * @returns {string}
 *
 * Run a DESCRIBE query for a specific IRI
 *
 */

export default { createQuery: describeResource };

function describeResource(iri: string) {
	return `DESCRIBE <${iri}>`;
}
