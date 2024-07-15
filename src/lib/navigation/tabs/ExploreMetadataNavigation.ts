/* (c) Crown Copyright GCHQ */

import type { RoutedTabView } from './types';

export enum TabIndices {
	Labels = 0,
	Domains = 1,
	Ranges = 2
}

const tabDetail = {
	heading: 'Metadata',
	subheading:
		'Metadata is "data about the data". This can include things like labels, domains and ranges.',
	navigationLabel: 'Metadata',
	tabs: [
		{
			title: 'Labels',
			description: 'English-language RDFS Labels within the active datasets.',
			tabIndex: TabIndices.Labels,
			href: `/explore/metadata/labels`
		},
		{
			title: 'Domains',
			description:
				'Domain assertions within the active datasets. Domains are used to infer the class of a subject based on its associated properties.',
			tabIndex: TabIndices.Domains,
			href: `/explore/metadata/domains`
		},
		{
			title: 'Ranges',
			description:
				'Range assertions within the active datasets. Ranges are used to infer the class of an object based on its associated properties.',
			tabIndex: TabIndices.Ranges,
			href: `/explore/metadata/ranges`
		}
	]
} as RoutedTabView<TabIndices>;

export default () => tabDetail;
