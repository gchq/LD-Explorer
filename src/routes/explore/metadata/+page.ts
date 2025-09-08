/* (c) Crown Copyright GCHQ */

import type { PageLoad } from './$types';
import { resolve } from '$app/paths';
import { goto } from '$app/navigation';

// Currently there is no metadata root page, so this just redirects to labels (currently first tab in the list)
export const load = (() => {
	goto(resolve(`/explore/metadata/labels`));
}) satisfies PageLoad;
