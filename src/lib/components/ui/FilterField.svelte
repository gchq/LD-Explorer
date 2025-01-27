<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	/**
	 *
	 * This is a hopefully temporary component created as a workaround for the lack of a viable
	 * component in the ICDS component libary. The issues with using the provided component were
	 * as follows:
	 *
	 * - I want an icon - the textfield icon currently has bugs.
	 * - I want a search-clear button, the icds library has disabled this.
	 *
	 * In order to go back to using the ICDS components, we would need the above to be provided.
	 *
	 */
	import { Filter } from '$lib/components/ui/icons';
	import clsx from 'clsx';
	import type { EventHandler } from 'svelte/elements';

	interface Props {
		label: string;
		value: string | number;
		onInput: EventHandler;
	}

	let { onInput, label, value = $bindable() }: Props = $props();
	let hasFocus = $state(false);
</script>

<div
	class={clsx(
		'border border-gray-400 rounded-sm w-full h-10 sm:flex',
		hasFocus && 'ring-4 ring-offset-2 ring-icds-focus-glow'
	)}
>
	<i
		class="ml-2 inline-block w-[24px] h-[24px] stroke-none fill-current relative top-2 text-gray-800"
		><Filter /></i
	>
	<input
		aria-label={label}
		type="search"
		placeholder="Filter results"
		class="px-2 outline-hidden flex-grow sm:w-72"
		bind:value
		oninput={onInput}
		onfocus={() => (hasFocus = true)}
		onfocusout={() => (hasFocus = false)}
	/>
</div>
