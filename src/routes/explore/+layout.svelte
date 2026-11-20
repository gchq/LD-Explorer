<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { SubNavLayout } from '#lib/components/layout/nav/index.ts';
	import { exploreSubNavItems } from '#lib/navigation/index.ts';
</script>

<SubNavLayout navItems={exploreSubNavItems}>
	<slot />
</SubNavLayout>
