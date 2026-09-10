/* (c) Crown Copyright GCHQ */

import { ArrayIterator } from 'asynciterator';
import { get } from 'svelte/store';
import { createEngine } from '$lib/querying/engine';
import { QueryStatus } from '$lib/types';
import { logger } from '$stores/logger.store';
import { createQueryStore } from './streamedQuery.store';
import type { QuerySources } from './sources/sources.store';

vi.mock('$lib/querying/engine', () => ({ createEngine: vi.fn() }));

const query = 'SELECT * WHERE { ?s ?p ?o }';
const sources: QuerySources = ['https://example.com/data.ttl'];
const engine = { query: vi.fn() };
const execute = vi.fn();
let subscriptions: (() => void)[];

function deferred<T>() {
	let resolve!: (value: T) => void;
	let reject!: (reason: unknown) => void;
	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return { promise, resolve, reject };
}

function watch() {
	const store = createQueryStore(query, sources);
	const unsubscribe = store.subscribe(() => undefined);
	subscriptions.push(unsubscribe);
	return { store, unsubscribe };
}

async function flush() {
	// Drain the engine, planning and execution continuations deterministically.
	for (let i = 0; i < 10; i++) await Promise.resolve();
}

beforeEach(() => {
	subscriptions = [];
	vi.resetAllMocks();
	vi.mocked(createEngine).mockResolvedValue(
		engine as unknown as Awaited<ReturnType<typeof createEngine>>
	);
	engine.query.mockResolvedValue({ resultType: 'bindings', execute });
	vi.spyOn(logger, 'addError').mockImplementation(() => undefined);
});

afterEach(() => {
	subscriptions.forEach((unsubscribe) => unsubscribe());
	vi.restoreAllMocks();
});

it('does not plan a query stopped while the engine loads', async () => {
	const pending = deferred<Awaited<ReturnType<typeof createEngine>>>();
	vi.mocked(createEngine).mockReturnValue(pending.promise);
	const { store } = watch();
	store.stop();
	pending.resolve(engine as unknown as Awaited<ReturnType<typeof createEngine>>);
	await flush();
	expect(engine.query).not.toHaveBeenCalled();
	expect(get(store).status).toBe(QueryStatus.Halted);
});

it('aborts pending HTTP work and does not execute a stopped query plan', async () => {
	const pending = deferred<{ resultType: string; execute: typeof execute }>();
	engine.query.mockReturnValue(pending.promise);
	const { store } = watch();
	await flush();
	const context = engine.query.mock.calls[0][1];
	store.stop();
	pending.resolve({ resultType: 'bindings', execute });
	await flush();
	expect(context.httpAbortSignal?.aborted).toBe(true);
	expect(execute).not.toHaveBeenCalled();
	expect(get(store).status).toBe(QueryStatus.Halted);
});

it('does not execute after a subscriber stops the Fetching transition', async () => {
	const { store } = watch();
	subscriptions.push(
		store.subscribe((value) => {
			if (value.status === QueryStatus.Fetching) store.stop();
		})
	);
	await flush();
	expect(execute).not.toHaveBeenCalled();
	expect(get(store).status).toBe(QueryStatus.Halted);
});

it.each(['bindings', 'quads'])(
	'destroys a late %s stream without consuming it',
	async (resultType) => {
		const pending = deferred<ArrayIterator<never>>();
		execute.mockReturnValue(pending.promise);
		engine.query.mockResolvedValue({ resultType, execute });
		const { store } = watch();
		await flush();
		expect(execute).toHaveBeenCalledOnce();
		store.stop();
		const stream = new ArrayIterator<never>([], { autoStart: false });
		const destroy = vi.spyOn(stream, 'destroy');
		pending.resolve(stream);
		await flush();
		expect(destroy).toHaveBeenCalledOnce();
		expect(get(store).status).toBe(QueryStatus.Halted);
		expect(get(store).results).toEqual([]);
	}
);

it('ignores a boolean result that resolves after stopping', async () => {
	const pending = deferred<boolean>();
	execute.mockReturnValue(pending.promise);
	engine.query.mockResolvedValue({ resultType: 'boolean', execute });
	const { store } = watch();
	await flush();
	store.stop();
	pending.resolve(true);
	await flush();
	expect(get(store).status).toBe(QueryStatus.Halted);
	expect(get(store).results).toEqual([]);
});

it.each(['engine', 'planning', 'execution'])(
	'ignores late %s rejection after stopping',
	async (stage) => {
		const pending = deferred<never>();
		if (stage === 'engine') vi.mocked(createEngine).mockReturnValue(pending.promise);
		else if (stage === 'planning') engine.query.mockReturnValue(pending.promise);
		else execute.mockReturnValue(pending.promise);
		const { store } = watch();
		await flush();
		store.stop();
		pending.reject(new Error('Cancelled query'));
		await flush();
		expect(get(store).status).toBe(QueryStatus.Halted);
		expect(logger.addError).not.toHaveBeenCalled();
	}
);

it('discards buffered results when stopped from a data notification', async () => {
	const stream = new ArrayIterator([true, false, true]);
	const destroy = vi.spyOn(stream, 'destroy');
	execute.mockResolvedValue(stream);
	const { store } = watch();
	subscriptions.push(
		store.subscribe((value) => {
			if (value.status === QueryStatus.Fetching && value.results.length === 1) store.stop();
		})
	);
	await vi.waitFor(() => expect(get(store).status).toBe(QueryStatus.Halted));
	await new Promise((resolve) => setTimeout(resolve, 0));
	expect(get(store).results).toEqual([true]);
	expect(destroy).toHaveBeenCalledOnce();
	store.stop();
	expect(destroy).toHaveBeenCalledOnce();
});
