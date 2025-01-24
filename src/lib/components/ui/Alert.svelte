<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcStatusVariants } from '@ukic/web-components';

	export let heading: string;
	export let message: string;
	export let variant: IcStatusVariants = 'neutral';
	export let dismissible = false;
</script>

<div>
	<ic-alert class="my-4" {variant} {heading} {dismissible} {message}></ic-alert>
</div>
