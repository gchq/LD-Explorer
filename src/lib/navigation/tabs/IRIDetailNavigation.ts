/* (c) Crown Copyright GCHQ */

import type { RoutedTabView } from './types';
import { resolve } from '$app/paths';

export enum TabIndices {
	DESCRIBE = 0,
	Appearances = 1,
	Instances = 2,
	Subclasses = 3,
	Superclasses = 4
}

const getQuerystring = (iri: string) => `?iri=${encodeURIComponent(iri)}`;

export default function createTabDetail(iri: string): RoutedTabView<TabIndices> {
	return {
		heading: iri,
		subheading: 'Detail for a specific IRI',
		navigationLabel: 'IRI',
		tabs: [
			{
				title: 'DESCRIBE query',
				description:
					'Results of running a DESCRIBE query for this IRI. Note that only unique values are shown in the interface, even if that value appears across multiple data sources.',
				tabIndex: TabIndices.DESCRIBE,
				href: resolve('/explore/iris/detail') + getQuerystring(iri)
			},
			{
				title: 'Appearances',
				description:
					'Any appearances of this IRI within any triple (as either the subject, the predicate or the object).',
				tabIndex: TabIndices.Appearances,
				href: resolve('/explore/iris/detail/appearances') + getQuerystring(iri)
			},
			{
				title: 'Instances',
				description: 'Any resources identified to be instances of this resource.',
				tabIndex: TabIndices.Instances,
				href: resolve('/explore/iris/detail/instances') + getQuerystring(iri)
			},
			{
				title: 'Subclasses',
				description: 'Any resources identified to be subclasses of this resource.',
				tabIndex: TabIndices.Subclasses,
				href: resolve('/explore/iris/detail/subclasses') + getQuerystring(iri)
			},
			{
				title: 'Superclasses',
				description: 'Any resources identified to be superclasses of this resource (ancestors).',
				tabIndex: TabIndices.Superclasses,
				href: resolve('/explore/iris/detail/superclasses') + getQuerystring(iri)
			}
		]
	};
}
