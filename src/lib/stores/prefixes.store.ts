/* (c) Crown Copyright GCHQ */

import { createLocalStorageStore } from './localStorage.store';
import defaultPrefixes from '$lib/data/prefixes.json';

export const prefixes = createLocalStorageStore('prefixes', defaultPrefixes);
