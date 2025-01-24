<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	// Note that h1 is not a valid tag to pass in. This is because in ICDS' opinion
	// there should only be one of these on the page, this helps to ensure that
	// opinion is preserved.
	export let id: string | undefined = undefined;
	export let tag: 'h2' | 'h3' | 'h4' | 'h5' = 'h2';
	export let variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' = tag;
	export let text: string;
	export let applyVerticalMargins = true;
</script>

<ic-typography {id} {variant} class="leading-tight" apply-vertical-margins={applyVerticalMargins}>
	<svelte:element this={tag}>
		<slot name="before-text" />
		{text}
		<slot name="after-text" />
	</svelte:element>
</ic-typography>
