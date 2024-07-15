/* (c) Crown Copyright GCHQ */

/*
These are the "pre built" queries that users can choose from when using the SPARQL UI. 
The idea is to collect together some common/useful queries to help users explore their data.

Ideally this file would not be "code" and would instead be specified as config.
*/

interface ExampleQueries {
	queryName: string;
	query: string;
}

const exampleQueries: ExampleQueries[] = [
	{
		queryName: 'Select bindings for first 100 triples',
		query: 'SELECT * WHERE { ?s ?p ?o } LIMIT 100'
	},
	{
		queryName: 'Construct from first 100 triples',
		query: 'CONSTRUCT WHERE { ?s ?p ?o } LIMIT 100'
	},
	{
		queryName: 'Ask if any triples exist',
		query: 'ASK { ?s ?p ?o }'
	},

	{
		queryName: 'Infer from owl:inverseOf',
		query: `PREFIX owl: <http://www.w3.org/2002/07/owl#>

CONSTRUCT {?o ?p2 ?s}
WHERE {
  ?p2 owl:inverseOf ?p1 .
  ?s ?p1 ?o
}`
	},
	{
		queryName: 'Infer sameness from owl:FunctionalProperty',
		query: `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

CONSTRUCT {?a owl:sameAs ?b}
WHERE {
	?p rdf:type owl:FunctionalProperty .
	?x ?p ?a .
	?x ?p ?b
	FILTER (?a != ?b)
}`
	},
	{
		queryName: 'Infer sameness from owl:InverseFunctionalProperty',
		query: `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

CONSTRUCT {?a owl:sameAs ?b}
WHERE {
	?p rdf:type owl:InverseFunctionalProperty .
	?a ?p ?x .
	?b ?p ?x
	FILTER (?a != ?b)
}`
	},
	{
		queryName: 'Infer class from rdfs:range',
		query: `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

CONSTRUCT {?o rdf:type ?A}
WHERE {
	?P rdfs:range ?A .
	?s ?P ?o }`
	},
	{
		queryName: 'Infer class from rdfs:domain',
		query: `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

CONSTRUCT {?s rdf:type ?A}
WHERE {
	?P rdfs:domain ?A .
	?s ?P ?o }`
	},
	{
		queryName: 'Infer from owl:sameAs (subject)',
		query: `PREFIX owl: <http://www.w3.org/2002/07/owl#>

CONSTRUCT { ?x ?p ?o }
WHERE { 
	?y ?p ?o .
	?x owl:sameAs ?y .
}`
	},
	{
		queryName: 'Infer from owl:sameAs (predicate)',
		query: `PREFIX owl: <http://www.w3.org/2002/07/owl#>

CONSTRUCT { ?s ?x ?o }
WHERE { 
	?s ?y ?o .
	?x owl:sameAs ?y . 
}`
	},
	{
		queryName: 'Infer from owl:sameAs (object)',
		query: `PREFIX owl: <http://www.w3.org/2002/07/owl#>

CONSTRUCT { ?s ?p ?x }
WHERE { 
	?s ?p ?y .
	?x owl:sameAs ?y . 
}`
	},
	{
		queryName: 'Infer from owl:SymmetricProperty',
		query: `PREFIX owl: <http://www.w3.org/2002/07/owl#>

CONSTRUCT { ?x ?p ?y }
WHERE { 
	?y ?p ?x .
	?p a owl:SymmetricProperty .
}`
	},
	{
		queryName: 'Infer from owl:equivalentClass',
		query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>

CONSTRUCT {?s rdf:type ?B}
WHERE {
	?A owl:equivalentClass ?B .
	?s rdf:type ?A .
}`
	},
	{
		queryName: 'Infer from owl:equivalentProperty',
		query: `PREFIX owl: <http://www.w3.org/2002/07/owl#>

CONSTRUCT {?a ?Q ?b}
WHERE {
	?a ?P ?b .
	?P owl:equivalentProperty ?Q .
}`
	},
	{
		queryName: 'Union data from all graphs',
		query: `SELECT ?g ?s ?p ?o
WHERE {
{
	?s ?p ?o
}
UNION
{
	GRAPH ?g { ?s ?p ?o } }
}`
	}
];

export default exampleQueries;
