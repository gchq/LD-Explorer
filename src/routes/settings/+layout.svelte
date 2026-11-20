<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { SubNavLayout } from '#lib/components/layout/nav/index.ts';
	import { settingsSubNavItems } from '#lib/navigation/index.ts';
</script>

<SubNavLayout navItems={settingsSubNavItems}>
	<slot />
</SubNavLayout>
