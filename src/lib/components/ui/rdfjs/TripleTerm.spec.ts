/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import { DataFactory } from 'n3';
import TripleTerm from './TripleTerm.svelte';
import { hydratedRender as render } from '$test-helpers/render';
import { screen } from 'shadow-dom-testing-library';

const { literal, namedNode, quad } = DataFactory;

const exampleTerm = quad(
	namedNode('http://example.com/Bob'),
	namedNode('http://example.com/hasName'),
	literal('Robert'),
	namedNode('http://www.example.com/graph1')
);

describe(TripleTerm, () => {
	describe('when rendering a quoted triple term', () => {
		beforeEach(async () => {
			await render(TripleTerm, {
				term: exampleTerm
			});
		});
		it('outputs the value of the subject', async () => {
			expect(await screen.queryByText('http://example.com/Bob')).toBeInTheDocument();
		});
		it('outputs the value of the predicate', async () => {
			expect(await screen.queryByText('http://example.com/hasName')).toBeInTheDocument();
		});
		it('outputs the value of the object', async () => {
			expect(await screen.queryByText('Robert')).toBeInTheDocument();
		});
		it('by default does not output the graph name', async () => {
			const graphIRI = screen.queryByText('http://www.example.com/graph1');
			expect(graphIRI).not.toBeInTheDocument();
		});
	});

	describe('when "show graph" option is set to true', () => {
		it('also shows the graph portion of the triple', async () => {
			await render(TripleTerm, {
				term: exampleTerm,
				showGraph: true
			});
			const graphIRI = await screen.findByText('http://www.example.com/graph1');
			expect(graphIRI).toBeInTheDocument();
		});
	});
});
