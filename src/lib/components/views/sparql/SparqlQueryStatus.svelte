<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Button, LoadingSpinner } from '$lib/components';
	import { QueryStatus } from '$lib/types';
	import { Stop } from '$lib/components/ui/icons';
	export let status: QueryStatus;
	export let onStop: () => void;
</script>

<dl class="">
	<dt class="inline-block font-bold mr-2 after:content-[':']">Query Status</dt>
	<dd class="inline-block">
		{#if status == QueryStatus.Fetching}
			<ic-status-tag label="Fetching" small="true" status="warning"></ic-status-tag>
			<LoadingSpinner />
		{:else if status == QueryStatus.Done}
			<ic-status-tag label="Complete" small="true" status="success"></ic-status-tag>
		{:else if status == QueryStatus.Error}
			<ic-status-tag label="Error" small="true" status="danger"></ic-status-tag>
		{:else}
			<ic-status-tag label={status} small="true" status="neutral"></ic-status-tag>
		{/if}
		<Button
			label="Halt Query"
			onclick={onStop}
			variant="tertiary"
			size="small"
			disabled={status != QueryStatus.Fetching}
		>
			<i slot="icon"><Stop /></i>
		</Button>
	</dd>
</dl>
