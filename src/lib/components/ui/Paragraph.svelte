<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcTypographyVariants } from '@ukic/web-components';

	export let applyVerticalMargins = true;
	export let variant: IcTypographyVariants = 'body';
</script>

<ic-typography apply-vertical-margins={applyVerticalMargins} {variant}>
	<p>
		<slot />
	</p>
</ic-typography>
