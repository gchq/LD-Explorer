/* (c) Crown Copyright GCHQ */

import type { LayoutLoad } from './$types';

export const load = (({ url }) => {
	return {
		iri: decodeURIComponent(url.searchParams.get('iri') || '')
	};
}) satisfies LayoutLoad;
