<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcSwitchChangeEventDetail } from '@ukic/web-components';

	interface Props {
		onchange: ({ checked }: { checked: boolean }) => void;
		label: string;
		helperText: string;
		checked: boolean;
	}

	let { label, helperText, checked = $bindable(), onchange }: Props = $props();

	function handleInput(e: CustomEvent<IcSwitchChangeEventDetail>) {
		checked = e.detail.checked;
		onchange({ checked });
	}
</script>

<ic-switch
	class="block mt-4 mb-2"
	{label}
	helper-text={helperText}
	{checked}
	on:icChange={handleInput}
/>
