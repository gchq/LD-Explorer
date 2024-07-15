<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { SubNavLayout } from '$lib/components/layout/nav';
	import { exploreSubNavItems } from '$lib/navigation';
</script>

<SubNavLayout navItems={exploreSubNavItems}>
	<slot />
</SubNavLayout>
