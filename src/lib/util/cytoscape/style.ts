/* (c) Crown Copyright GCHQ */

import type cytoscape from 'cytoscape';

export default function createCytoscapeStyles(darkMode: boolean = false): cytoscape.StylesheetJson {
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
			selector: 'node[isGraph]',
			style: {
				'background-color': darkMode ? '#333' : '#f5f5f5',
				'background-opacity': 0.6,
				'border-color': darkMode ? '#aaa' : '#555',
				'border-width': 1,
				'font-size': '8px',
				padding: '16px',
				shape: 'roundrectangle',
				'text-halign': 'center',
				'text-valign': 'top'
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
