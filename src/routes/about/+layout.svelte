<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { SubNavLayout } from '$lib/components/layout/nav';
	import { aboutSubNavItems } from '$lib/navigation';
</script>

<SubNavLayout navItems={aboutSubNavItems}>
	<slot />
</SubNavLayout>
