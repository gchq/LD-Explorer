<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcButtonVariants, IcSizes } from '@ukic/web-components';
	import { base } from '$app/paths';
	export let label: string;
	export let href: string;
	export let variant: IcButtonVariants = 'primary';
	export let size: IcSizes = 'default';
	export let ariaLabel: string | undefined = undefined;

	let relativeHref = href.startsWith('/') ? href.substring(1) : href;
</script>

<ic-button
	{size}
	{variant}
	class="break-words"
	href={`${base}/${relativeHref}`}
	aria-label={ariaLabel}
>
	{label}
	<slot name="icon" />
</ic-button>
