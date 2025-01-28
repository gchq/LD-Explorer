<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { SubNav, SubNavItem } from '.';
	import { page } from '$app/stores';
	import { shouldHighlightSubNav } from '$lib/util/nav.utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		navItems: {
			title: string;
			href: string;
			match?: RegExp;
		}[];
	}

	let { children, navItems }: Props = $props();
</script>

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-3 lg:col-span-2">
		<SubNav>
			{#each navItems as { href, title, match }}
				<SubNavItem
					{href}
					{title}
					selected={shouldHighlightSubNav(href, $page.url.pathname, match)}
				/>
			{/each}
		</SubNav>
	</div>
	<div class="col-span-12 md:col-span-9 lg:col-span-10 pb-16">
		{@render children?.()}
	</div>
</div>
