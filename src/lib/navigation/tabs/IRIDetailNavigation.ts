/* (c) Crown Copyright GCHQ */

import type { RoutedTabView } from './types';

export enum TabIndices {
	DESCRIBE = 0,
	Appearances = 1,
	Instances = 2,
	Subclasses = 3,
	Superclasses = 4
}

const getUrl = (iri: string, path: string) =>
	path.length
		? `/explore/iris/detail/${path}?iri=${encodeURIComponent(iri)}`
		: `/explore/iris/detail?iri=${encodeURIComponent(iri)}`;

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
				href: getUrl(iri, '')
			},
			{
				title: 'Appearances',
				description:
					'Any appearances of this IRI within any triple (as either the subject, the predicate or the object).',
				tabIndex: TabIndices.Appearances,
				href: getUrl(iri, 'appearances')
			},
			{
				title: 'Instances',
				description: 'Any resources identified to be instances of this resource.',
				tabIndex: TabIndices.Instances,
				href: getUrl(iri, 'instances')
			},
			{
				title: 'Subclasses',
				description: 'Any resources identified to be subclasses of this resource.',
				tabIndex: TabIndices.Subclasses,
				href: getUrl(iri, 'subclasses')
			},
			{
				title: 'Superclasses',
				description: 'Any resources identified to be superclasses of this resource (ancestors).',
				tabIndex: TabIndices.Superclasses,
				href: getUrl(iri, 'superclasses')
			}
		]
	};
}
