<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { SubNavLayout } from '$lib/components/layout/nav';
	import { settingsSubNavItems } from '$lib/navigation';
</script>

<SubNavLayout navItems={settingsSubNavItems}>
	<slot />
</SubNavLayout>
