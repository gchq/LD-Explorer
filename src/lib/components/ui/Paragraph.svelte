<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcTypographyVariants } from '@ukic/web-components';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		applyVerticalMargins?: boolean;
		variant?: IcTypographyVariants;
	}

	let { applyVerticalMargins = true, variant = 'body', children }: Props = $props();
</script>

<ic-typography apply-vertical-margins={applyVerticalMargins} {variant}>
	<p class="m-auto py-2">
		{@render children?.()}
	</p>
</ic-typography>
