/* (c) Crown Copyright GCHQ */

import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { sources } from '$stores/sources/sources.store';

export const load = (({ params }) => {
	const currentSources = get(sources);
	const source = currentSources.find((s) => s.id === params.id);

	if (source) return { source };
	else error(404, 'Not found');
}) satisfies LayoutLoad;
