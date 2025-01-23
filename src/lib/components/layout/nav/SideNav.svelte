<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	/**
	 * Note that there is a temporary solution in this component that changes
	 * the behavior of the secondary nav items on small screen sizes (see references
	 * to 'isSmall'). This is included due to an issue in the ICDS component library
	 * which is renders the app unusable at high zoom levels. Given that we are required
	 * to meet WCAG AA (must support zoom at 400%), this workaround included until
	 * a more permenant solution appears in the ICDS library.
	 *
	 * ICDS already aware of issue, details here: https://github.com/mi6/ic-ui-kit/issues/1922
	 */
	import {
		About,
		Code,
		Database,
		Home,
		Icon,
		Logo,
		Logs,
		Search,
		Settings
	} from '$lib/components/ui/icons';
	import { type SideNavId, primarySideNavItems, secondarySideNavItems } from '$lib/navigation';
	import { errorLogs, warningLogs } from '$stores/logger.store';
	import { Badge } from '$lib/components';
	import type { Component } from 'svelte';
	import type { IcBadgeVariants } from '@ukic/web-components';
	import { ViewportHelper } from '$lib/components/helpers';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { shouldHighlightSideNav } from '$lib/util/nav.utils';
	import { sources } from '$stores/sources/sources.store';
	import { version } from '$lib/constants';

	type SideNavItemDetail = {
		[key in SideNavId]: {
			icon: Component;
			badgeDetails?: {
				label: string;
				variant: IcBadgeVariants;
				visible: boolean;
			};
		};
	};

	$: logAlertLevel = (
		$errorLogs.length ? 'error' : $warningLogs.length ? 'warning' : undefined
	) as IcBadgeVariants;

	$: navItemDetail = {
		home: {
			icon: Home
		},
		explore: {
			icon: Search
		},
		'sparql-ui': {
			icon: Code
		},
		sources: {
			icon: Database,
			badgeDetails: {
				label: 'No sources have been added',
				variant: 'warning',
				visible: !$sources.length
			}
		},
		logs: {
			icon: Logs,
			badgeDetails: {
				label: `${logAlertLevel ? logAlertLevel + ' entries' : 'No entries'} are available in the logs`,
				variant: logAlertLevel,
				visible: !!logAlertLevel
			}
		},
		settings: {
			icon: Settings
		},
		about: {
			href: '/about',
			icon: About
		}
	} as SideNavItemDetail;

	let isSmall: boolean;
</script>

<!-- Include this as ic-side-navigation does not include an H1 (oversight?) -->
<ViewportHelper bind:isSmall />

<ic-side-navigation
	app-title="LD-Explorer"
	version={`v${version}`}
	data-testid="main-nav"
	status="Prototype"
	collapsed-icon-labels
	href={`${base}/`}
>
	<div slot="app-icon">
		<Icon><Logo /></Icon>
	</div>

	{#each primarySideNavItems as { id, title, href }}
		<ic-navigation-item
			label={title}
			href={`${base}${href}`}
			slot="primary-navigation"
			selected={shouldHighlightSideNav(base, href, page.url.pathname)}
		>
			{#if !!navItemDetail[id].badgeDetails}
				<div slot="badge">
					<Badge
						size="large"
						type="dot"
						ariaLabel={navItemDetail[id]?.badgeDetails?.label}
						variant={navItemDetail[id]?.badgeDetails?.variant}
						visible={navItemDetail[id]?.badgeDetails?.visible}
					></Badge>
				</div>
			{/if}

			<div slot="icon">
				<Icon><svelte:component this={navItemDetail[id].icon} /></Icon>
			</div>
		</ic-navigation-item>
	{/each}

	{#each secondarySideNavItems as { id, title, href }}
		{#if !isSmall}
			<ic-navigation-item
				label={title}
				href={`${base}${href}`}
				slot="secondary-navigation"
				selected={shouldHighlightSideNav(base, href, page.url.pathname)}
			>
				<div slot="icon">
					<Icon><svelte:component this={navItemDetail[id].icon} /></Icon>
				</div>
			</ic-navigation-item>
		{:else}
			<ic-navigation-item
				label={title}
				href={`${base}${href}`}
				slot="primary-navigation"
				selected={shouldHighlightSideNav(base, href, page.url.pathname)}
			>
				<div slot="icon">
					<Icon><svelte:component this={navItemDetail[id].icon} /></Icon>
				</div>
			</ic-navigation-item>
		{/if}
	{/each}
</ic-side-navigation>
