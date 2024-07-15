<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcSwitchChangeEventDetail } from '@ukic/web-components';
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let helperText: string;
	export let checked: boolean;

	// Events
	const dispatch = createEventDispatcher();

	function handleInput(e: CustomEvent<IcSwitchChangeEventDetail>) {
		checked = e.detail.checked;
		dispatch('change', { checked });
	}
</script>

<ic-switch
	class="block mt-4 mb-2"
	{label}
	helper-text={helperText}
	{checked}
	on:icChange={handleInput}
/>
