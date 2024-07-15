/* (c) Crown Copyright GCHQ */

import type { RoutedTabView } from './types';

export enum TabIndices {
	AllClasses = 0,
	BaseClasses = 1
}

const tabDetail = {
	heading: 'Classes',
	subheading:
		'Resources either defined as classes or inferred to be classes for all active sources.',
	navigationLabel: 'Classes',
	tabs: [
		{
			title: 'All Classes',
			description: 'All classes across all active datasources.',
			tabIndex: TabIndices.AllClasses,
			href: `/explore/classes`
		},
		{
			title: 'Base Classes',
			description:
				'Base classes across all active datasources (those not asserted to be subclasses).',
			tabIndex: TabIndices.BaseClasses,
			href: `/explore/classes/base`
		}
	]
} as RoutedTabView<TabIndices>;

export default () => tabDetail;
