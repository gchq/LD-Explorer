/* (c) Crown Copyright GCHQ */

import { derived, writable } from 'svelte/store';
import type { Logger } from '@comunica/types';

type LogType = 'error' | 'info' | 'warning';
type LogEntryMetadata = { [key: string]: string };

export interface LogEntry {
	timestamp: number;
	title: string;
	message: string;
	type: LogType;
	metadata?: LogEntryMetadata;
}

function createLogger() {
	const { subscribe, set, update } = writable<LogEntry[]>([]);

	return {
		clear: () => set([]),
		add(title: string, message: string, type: LogType, metadata?: LogEntryMetadata) {
			update((logs) => [...logs, { title, message, type, metadata, timestamp: Date.now() }]);
		},
		addInfo(title: string, message: string, metadata?: LogEntryMetadata) {
			this.add(title, message, 'info', metadata);
		},
		addWarning(title: string, message: string, metadata?: LogEntryMetadata) {
			console.warn(message);
			this.add(title, message, 'warning', metadata);
		},
		addError(title: string, error: Error, metadata?: LogEntryMetadata) {
			console.error(error);
			this.add(`${title}: ${error.name}`, error.message, 'error', metadata);
		},
		addErrorMessage(title: string, message: string, metadata?: LogEntryMetadata) {
			this.addError(title, new Error(message), metadata);
		},
		subscribe
	};
}

export const logger = createLogger();

// A comunica logger - just a wrapper for the LDExplorer logger API that makes it compatible with Comunica,
// allowing it to be passed to comunica engines to capture logs from the engine itself.
// TODO: This should probably live in its own file.
export const comunicaLogger: Logger = {
	trace: function (message: string, data?: LogEntryMetadata): void {
		logger.addInfo('Comunica', message, data);
	},
	debug: function (message: string, data?: LogEntryMetadata): void {
		logger.addInfo('Comunica', message, data);
	},
	info: function (message: string, data?: LogEntryMetadata): void {
		logger.addInfo('Comunica', message, data);
	},
	warn: function (message: string, data?: LogEntryMetadata): void {
		logger.addWarning('Comunica', message, data);
	},
	error: function (message: string, data?: LogEntryMetadata): void {
		logger.addErrorMessage('Comunica', message, data);
	},
	fatal: function (message: string, data?: LogEntryMetadata): void {
		logger.addErrorMessage('Comunica', message, data);
	},
	// The functionality below introduced in comunica 5.2.1 is required by any logger that is
	// passed to comunica and is basically a way of reducing console spam.
	// https://github.com/comunica/comunica/blob/master/packages/types/lib/Logger.ts#L56
	// It's stubbed out for now - we've wrapped the logger to use it elsewhere and our verison
	// does not support this functionality (yet).
	// @ts-expect-error see above
	activeLogGroups: undefined,
	repetitionCounter: 0,
	groupedLogLimit: 5,
	logGrouped: () => {},
	flush: () => {}
};

export const recentLogs = derived(logger, ($logger) =>
	$logger.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)).slice(0, 100)
);

export const errorLogs = derived(logger, ($logger) =>
	$logger.filter((log) => log.type === 'error')
);

export const warningLogs = derived(logger, ($logger) =>
	$logger.filter((log) => log.type === 'warning')
);
