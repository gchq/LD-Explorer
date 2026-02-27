/* (c) Crown Copyright GCHQ */

export default function createCytoscapeStyles(darkMode: boolean = false) {
	return [
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
				'background-color': darkMode ? '#aaa' : '#000'
			}
		},
		{
			selector: 'label',
			style: {
				'font-size': '5px',
				color: darkMode ? '#fff' : '#000'
			}
		},
		{
			selector: 'edge',
			style: {
				width: 2,
				'line-color': darkMode ? '#555' : '#C4C8CD',
				'target-arrow-color': darkMode ? '#555' : '#C4C8CD',
				'target-arrow-shape': 'triangle',
				'curve-style': 'bezier',
				label: 'data(label)'
			}
		}
	];
}
