<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcTextFieldTypes, IcValueEventDetail } from '@ukic/web-components';
	import { ViewportHelper } from '$lib/components/helpers';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	// Required Props
	export let label: string;
	export let value: string | number;

	// Events
	const dispatch = createEventDispatcher();

	// Optional Props
	export let helperText = '';
	export let inline = false;
	export let placeholder: string | undefined = undefined;
	export let readonly = false;
	export let codeEditor = false;
	export let type: IcTextFieldTypes = 'text';
	export let required = false;
	export let validationEnabled = false;
	export let isValid = true;
	export let validationErrorMessage = '';
	export let rows: number | undefined = undefined;

	// State
	$: validationError = validationEnabled && !isValid;

	// Events
	function handleInput(e: CustomEvent<IcValueEventDetail>) {
		value = e.detail.value;
		dispatch('input', { e });
	}

	let isSmall: boolean;
</script>

<ViewportHelper bind:isSmall />

<ic-text-field
	on:icInput={handleInput}
	{readonly}
	{value}
	{rows}
	{required}
	{label}
	{type}
	{placeholder}
	full-width={codeEditor || isSmall}
	class={clsx('mb-2', codeEditor && 'font-mono mt-4 mb-2', inline && 'inline-block')}
	helper-text={helperText}
	validation-status={validationError ? 'error' : ''}
	validation-text={validationErrorMessage}
></ic-text-field>
