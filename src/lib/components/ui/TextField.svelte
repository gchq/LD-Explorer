<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcTextFieldTypes, IcValueEventDetail } from '@ukic/web-components';
	import { ViewportHelper } from '$lib/components/helpers';
	import { clsx } from 'clsx';

	// Props

	interface Props {
		// mandatory
		label: string;
		value: string | number;

		// optional
		oninput?: (e: CustomEvent<IcValueEventDetail>) => void;
		helperText?: string;
		inline?: boolean;
		placeholder?: string;
		readonly?: boolean;
		codeEditor?: boolean;
		type?: IcTextFieldTypes;
		required?: boolean;
		validationEnabled?: boolean;
		isValid?: boolean;
		validationErrorMessage?: string;
		rows?: number;
	}

	let {
		oninput,
		label,
		value = $bindable(),
		helperText = '',
		inline = false,
		placeholder,
		readonly = false,
		codeEditor = false,
		type = 'text',
		required = false,
		validationEnabled = false,
		isValid = true,
		validationErrorMessage = '',
		rows
	}: Props = $props();

	// State
	let validationError = $derived(validationEnabled && !isValid);
	let isSmall: boolean = $state(false);

	// Events
	function handleInput(e: CustomEvent<IcValueEventDetail>) {
		value = e.detail.value;
		oninput?.(e);
	}
</script>

<ViewportHelper bind:isSmall />

<ic-text-field
	onicInput={handleInput}
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
