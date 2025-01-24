/* (c) Crown Copyright GCHQ */

import type { LayoutLoad } from './$types';

export const load = (({ url }) => {
	return {
		iri: url.searchParams.get('iri') || ''
	};
}) satisfies LayoutLoad;
