<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcStatusVariants } from '@ukic/web-components';

	interface Props {
		heading: string;
		message: string;
		variant?: IcStatusVariants;
		dismissible?: boolean;
	}

	let { heading, message, variant = 'neutral', dismissible = false }: Props = $props();
</script>

<div>
	<ic-alert class="my-4 text-inherit" {variant} {heading} {dismissible} {message}></ic-alert>
</div>
