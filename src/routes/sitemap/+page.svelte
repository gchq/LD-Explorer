<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Link, Tree, TreeItem } from '$lib/components';
	import { sideNavItems, subNavItems } from '$lib/navigation';
	import { PageView } from '$lib/components/views';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<PageView heading="Sitemap" subheading="Summary of the main pages within the app.">
	<Tree>
		{#each [...sideNavItems, ...data.nav.footerNavigation] as { id, href, title } (id)}
			<TreeItem>
				<Link {href}>{title}</Link>
				{#each subNavItems.filter((s) => s.parentId === id) as { href, title } (href)}
					<Tree drawBranch={true}>
						<TreeItem>
							<Link {href}>{title}</Link>
						</TreeItem>
					</Tree>
				{/each}
			</TreeItem>
		{/each}
	</Tree>
</PageView>
