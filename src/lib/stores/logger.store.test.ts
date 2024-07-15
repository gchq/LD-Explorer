/* (c) Crown Copyright GCHQ */

import { type LogEntry, comunicaLogger, logger, recentLogs } from './logger.store';
import type { SpyInstance } from 'vitest';
import { get } from 'svelte/store';

const exampleTitle = 'A title';
const exampleMessage = 'A message';
const exampleMetadata = { foo: 'Bar' };

describe('logger', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		logger.clear();
		vi.restoreAllMocks();
	});

	describe(logger.add, () => {
		describe('base functionality', () => {
			let entry: LogEntry;
			let currentTime: number;

			beforeEach(() => {
				logger.add(exampleTitle, exampleMessage, 'info');
				entry = get(logger)[0];
				currentTime = Date.now();
			});

			it('adds a single log', () => {
				expect(get(logger)).toHaveLength(1);
			});

			it('adds the correct title', () => {
				expect(entry.title).toEqual(exampleTitle);
			});

			it('adds the correct message', () => {
				expect(entry.message).toEqual(exampleMessage);
			});

			it('adds the correct type', () => {
				expect(entry.type).toEqual('info');
			});

			it('captures the timestamp', () => {
				expect(entry.timestamp).toEqual(currentTime);
			});
		});

		it('allows you to add other log types', () => {
			logger.add(exampleTitle, exampleMessage, 'error');
			const entry = get(logger)[0];
			expect(entry.type).toEqual('error');
		});

		it('optionally allows you to add metadata', () => {
			logger.add(exampleTitle, exampleMessage, 'info', { foo: 'Bar' });
			const entry = get(logger)[0];
			expect(entry.metadata).toEqual({ foo: 'Bar' });
		});
	});

	describe(logger.addInfo, () => {
		let add: SpyInstance;

		beforeEach(() => {
			add = vi.spyOn(logger, 'add');
			logger.addInfo(exampleTitle, exampleMessage);
		});

		it("adds the log entry with the type of 'info'", () => {
			expect(add).toHaveBeenCalledOnce();
			expect(add).toBeCalledWith(exampleTitle, exampleMessage, 'info', undefined);
		});
	});

	describe(logger.addWarning, () => {
		let warn: SpyInstance;
		let add: SpyInstance;

		beforeEach(() => {
			warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			add = vi.spyOn(logger, 'add');
			logger.addWarning(exampleTitle, exampleMessage);
		});

		it("adds the log entry with the type of 'warning'", () => {
			expect(add).toHaveBeenCalledOnce();
			expect(add).toBeCalledWith(exampleTitle, exampleMessage, 'warning', undefined);
		});

		it('logs a warning to the console with the given message', () => {
			expect(warn).toHaveBeenCalledOnce();
			expect(warn).toBeCalledWith(exampleMessage);
		});
	});

	describe(logger.addError, () => {
		let error: SpyInstance;
		let add: SpyInstance;

		beforeEach(() => {
			error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
			add = vi.spyOn(logger, 'add');

			logger.addError(exampleTitle, new Error(exampleMessage));
		});

		it("adds the log entry with the type of 'error'", () => {
			expect(add).toHaveBeenCalledOnce();
			expect(add).toBeCalledWith(`${exampleTitle}: Error`, exampleMessage, 'error', undefined);
		});

		it('logs an error to the console with the given message', () => {
			expect(error).toHaveBeenCalledOnce();
			expect(error).toBeCalledWith(new Error(exampleMessage));
		});
	});

	describe(logger.addErrorMessage, () => {
		let addError: SpyInstance;

		beforeEach(() => {
			addError = vi.spyOn(logger, 'addError').mockImplementation(() => undefined);
			logger.addErrorMessage(exampleTitle, exampleMessage);
		});

		it('Passes the message on as an error to the addError function', () => {
			expect(addError).toHaveBeenCalledOnce();
			expect(addError).toBeCalledWith(exampleTitle, new Error(exampleMessage), undefined);
		});
	});
});

describe('comunicaLogger', () => {
	let add: SpyInstance;

	beforeEach(() => {
		add = vi.spyOn(logger, 'add').mockImplementation(() => undefined);
		vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		vi.spyOn(console, 'error').mockImplementation(() => undefined);
	});

	afterEach(() => {
		logger.clear();
		vi.restoreAllMocks();
	});

	describe('when logging trace, debug and info messages', () => {
		it('passes these requests on to the add function of the logger as info messages', () => {
			comunicaLogger.info(exampleMessage, exampleMetadata);
			comunicaLogger.trace(exampleMessage, exampleMetadata);
			comunicaLogger.debug(exampleMessage, exampleMetadata);

			expect(add).toHaveBeenCalledTimes(3);
			expect(add).toHaveBeenNthCalledWith(1, 'Comunica', exampleMessage, 'info', exampleMetadata);
			expect(add).toHaveBeenNthCalledWith(2, 'Comunica', exampleMessage, 'info', exampleMetadata);
			expect(add).toHaveBeenNthCalledWith(3, 'Comunica', exampleMessage, 'info', exampleMetadata);
		});
	});

	describe('when logging warnings', () => {
		it('passes these requests on to the add function of the logger as warn messages', () => {
			comunicaLogger.warn(exampleMessage, exampleMetadata);

			expect(add).toHaveBeenCalledTimes(1);
			expect(add).toHaveBeenCalledWith('Comunica', exampleMessage, 'warning', exampleMetadata);
		});
	});

	describe('when logging error or fatal messages', () => {
		it('passes these requests on to the add function of the logger as warn messages', () => {
			comunicaLogger.error(exampleMessage, exampleMetadata);
			comunicaLogger.fatal(exampleMessage, exampleMetadata);

			expect(add).toHaveBeenCalledTimes(2);
			expect(add).toHaveBeenNthCalledWith(
				1,
				'Comunica: Error',
				exampleMessage,
				'error',
				exampleMetadata
			);
			expect(add).toHaveBeenNthCalledWith(
				2,
				'Comunica: Error',
				exampleMessage,
				'error',
				exampleMetadata
			);
		});
	});
});

describe('recentLogs', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		logger.clear();
		vi.restoreAllMocks();
	});

	it('sorts log entries by time created', () => {
		vi.setSystemTime(3000);
		logger.add('Entry 1', exampleMessage, 'info');
		vi.setSystemTime(1000);
		logger.add('Entry 2', exampleMessage, 'info');
		vi.setSystemTime(2000);
		logger.add('Entry 3', exampleMessage, 'info');

		expect(get(recentLogs)[0].title).toEqual('Entry 1');
		expect(get(recentLogs)[1].title).toEqual('Entry 3');
		expect(get(recentLogs)[2].title).toEqual('Entry 2');
	});
});
