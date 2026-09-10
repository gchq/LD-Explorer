/* (c) Crown Copyright GCHQ */

import { get } from 'svelte/store';
import { createEngine } from '$lib/querying/engine';
import { QueryStatus } from '$lib/types';
import { logger } from '$stores/logger.store';
import { createQueryStore } from './streamedQuery.store';
import type { QuerySources } from './sources/sources.store';

vi.mock('$lib/querying/engine', () => ({ createEngine: vi.fn() }));

const query = 'ASK { ?s ?p ?o }';
const sources: QuerySources = ['https://example.com/data.ttl'];
const error = new Error('Query failed');
const queryEngine = { query: vi.fn() };

beforeEach(() => {
	vi.resetAllMocks();
	vi.mocked(createEngine).mockResolvedValue(
		queryEngine as unknown as Awaited<ReturnType<typeof createEngine>>
	);
	vi.spyOn(logger, 'addError').mockImplementation(() => undefined);
});

afterEach(() => {
	vi.restoreAllMocks();
});

async function expectQueryFailure() {
	const store = createQueryStore(query, sources);
	await vi.waitFor(() => expect(get(store).status).toBe(QueryStatus.Error));
	expect(get(store).results).toEqual([]);
	expect(logger.addError).toHaveBeenCalledWith('Query', error, {
		sparqlQuery: query,
		sourceCount: '1'
	});
}

it('reports engine initialisation failures', async () => {
	vi.mocked(createEngine).mockRejectedValue(error);
	await expectQueryFailure();
});

it('reports query planning failures', async () => {
	queryEngine.query.mockRejectedValue(error);
	await expectQueryFailure();
});

it.each(['bindings', 'quads', 'boolean'])('reports %s execution failures', async (resultType) => {
	queryEngine.query.mockResolvedValue({
		resultType,
		execute: vi.fn().mockRejectedValue(error)
	});
	await expectQueryFailure();
});
