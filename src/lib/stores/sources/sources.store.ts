/* (c) Crown Copyright GCHQ */

import {
	type LocalSource,
	sources as localSource,
	sourceList as localSourceList
} from './local-sources.store';
import { type Readable, derived } from 'svelte/store';
import {
	type RemoteSource,
	sources as remoteSource,
	sourceList as remoteSourceList
} from './remote-sources.store';

import type { QuerySourceUnidentified } from '@comunica/types';

export type QuerySources = [QuerySourceUnidentified, ...QuerySourceUnidentified[]];

export interface Source {
	id: string;
	name: string;
	description: string;
	type: 'LOCAL' | 'REMOTE';
	enabled: boolean;
}

export const sources: Readable<(LocalSource | RemoteSource)[]> = derived(
	[localSource, remoteSource],
	([$localSource, $remoteSource]) => [...$localSource, ...$remoteSource]
);

// TODO: This is confusing, should be called something like "enabledSources"
export const sourceList: Readable<QuerySources> = derived(
	[localSourceList, remoteSourceList],
	([$localSourceList, $remoteSourceList]) =>
		[...$localSourceList, ...$remoteSourceList] as QuerySources
);
