<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { SubNavLayout } from '$lib/components/layout/nav';
	import { resolve } from '$app/paths';

	const navItems = [
		{ title: 'Data Sources', href: resolve('/sources'), match: /\/sources(?!\/catalog).*/ },
		{ title: 'Catalog', href: resolve('/sources/catalog') }
	];
</script>

<SubNavLayout {navItems}>
	<slot />
</SubNavLayout>
