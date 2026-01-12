/* (c) Crown Copyright GCHQ */

import '@testing-library/jest-dom';
import { hydratedRender, render } from '$test-helpers/render';
import { DataFactory } from 'n3';
import Term from './Term.svelte';
import { screen } from 'shadow-dom-testing-library';

const { blankNode, defaultGraph, literal, namedNode, quad } = DataFactory;

describe('Term component', () => {
	describe('when rendering a literal term', () => {
		beforeEach(() => {
			render(Term, { term: literal('foobar') });
		});
		it('outputs the value of the term', async () => {
			expect(await screen.findByText('foobar')).toBeInTheDocument();
		});
		it('outputs the value "Literal" label', async () => {
			expect(await screen.findByText('Literal')).toBeInTheDocument();
		});

		describe('when given a language tag', () => {
			it('outputs the language tag', async () => {
				render(Term, { term: literal('foobar', 'de') });
				expect(await screen.findByText('@de')).toBeInTheDocument();
			});
		});
	});

	describe('when rendering a Resource (IRI) term', () => {
		beforeEach(async () => {
			await hydratedRender(Term, { term: namedNode('http://www.example.com/') });
		});
		it('outputs the value of the term as a link', async () => {
			const link = await screen.findByShadowRole('link', { name: 'http://www.example.com/' });
			expect(link).toBeInTheDocument();
		});
		it('links to the explore Resource page within the app', async () => {
			const link = await screen.findByShadowRole('link', { name: 'http://www.example.com/' });
			expect(link).toHaveAttribute(
				'href',
				'/explore/iris/detail?iri=http%3A%2F%2Fwww.example.com%2F'
			);
		});
		it('outputs the value "Resource" label', async () => {
			expect(await screen.findByText('Resource')).toBeInTheDocument();
		});
	});

	describe('when rendering a blank node term', () => {
		beforeEach(() => {
			render(Term, { term: blankNode('I am a blank node') });
		});
		it('outputs the value of the term', async () => {
			expect(await screen.findByText('I am a blank node')).toBeInTheDocument();
		});
		it('outputs the value "Blank Node" label', async () => {
			expect(await screen.findByText('Blank Node')).toBeInTheDocument();
		});
	});

	describe('when rendering a triple term', () => {
		beforeEach(() => {
			render(Term, {
				term: quad(
					namedNode('http://example.com/Bob'),
					namedNode('http://example.com/hasName'),
					literal('Robert')
				)
			});
		});

		it('outputs the value of the subject', async () => {
			expect(await screen.findByText('http://example.com/Bob')).toBeInTheDocument();
		});

		it('outputs the value of the predicate', async () => {
			expect(await screen.findByText('http://example.com/hasName')).toBeInTheDocument();
		});

		it('outputs the value of the object', async () => {
			expect(await screen.findByText('Robert')).toBeInTheDocument();
		});

		it('outputs the value "Triple Term" label', async () => {
			expect(await screen.findByText('Triple Term')).toBeInTheDocument();
		});
	});

	describe('when rendering a default graph term', () => {
		beforeEach(() => {
			render(Term, { term: defaultGraph() });
		});
		it('outputs the value "Default Graph" label', async () => {
			expect(await screen.findByText('Default Graph')).toBeInTheDocument();
		});
	});
});
