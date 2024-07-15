/* (c) Crown Copyright GCHQ */

export interface RoutedTab<T> {
	title: string;
	href: string;
	description?: string;
	tabIndex: T;
}

export interface RoutedTabView<TabIndices> {
	heading: string;
	subheading: string;
	navigationLabel: string;
	tabs: RoutedTab<TabIndices>[];
}
