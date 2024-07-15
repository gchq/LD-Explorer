<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { SubNavLayout } from '$lib/components/layout/nav';

	const navItems = [
		{ title: 'Data Sources', href: '/sources', match: /\/sources(?!\/catalog).*/ },
		{ title: 'Catalog', href: '/sources/catalog' }
	];
</script>

<SubNavLayout {navItems}>
	<slot />
</SubNavLayout>
