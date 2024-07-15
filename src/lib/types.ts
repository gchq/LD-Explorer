/* (c) Crown Copyright GCHQ */

export enum QueryStatus {
	Initialized = 'Initialized',
	Fetching = 'Fetching',
	Halted = 'Halted',
	Done = 'Done',
	Error = 'Error'
}

export interface Prefix {
	label: string;
	iri: string;
}
