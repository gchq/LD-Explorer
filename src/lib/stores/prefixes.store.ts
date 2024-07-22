/* (c) Crown Copyright GCHQ */

import { createLocalStorageJSONStore } from './localStorageJson.store';
import defaultPrefixes from '$lib/data/prefixes.json';

export const prefixes = createLocalStorageJSONStore('prefixes', defaultPrefixes);
