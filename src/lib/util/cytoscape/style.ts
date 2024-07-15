/* (c) Crown Copyright GCHQ */

export default [
	// the stylesheet for the graph
	{
		selector: 'node',
		style: {
			label: 'data(label)',
			width: 20,
			height: 20
		}
	},
	{
		selector: 'node[termType = "NamedNode"]',
		style: {
			'background-color': '#fbbf24'
		}
	},
	{
		selector: 'node[termType = "Literal"]',
		style: {
			'background-color': '#000'
		}
	},
	{
		selector: 'label',
		style: {
			'font-size': '5px'
		}
	},
	{
		selector: 'edge',
		style: {
			width: 2,
			'line-color': '#C4C8CD',
			'target-arrow-color': '#C4C8CD',
			'target-arrow-shape': 'triangle',
			'curve-style': 'bezier',
			label: 'data(label)'
		}
	}
];
