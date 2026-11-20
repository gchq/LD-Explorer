<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { SubNavLayout } from '#lib/components/layout/nav/index.ts';
	import { aboutSubNavItems } from '#lib/navigation/index.ts';
</script>

<SubNavLayout navItems={aboutSubNavItems}>
	<slot />
</SubNavLayout>
