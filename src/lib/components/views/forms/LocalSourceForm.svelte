<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Button, Link, TextField } from '$lib/components';
	import { type LocalSource, sources } from '$stores/sources/local-sources.store';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	// Props
	export let handleSubmit: (s: LocalSource, document?: string) => void;

	// Form Data (including default values for new sources)
	export let source: LocalSource = {
		id: '',
		name: '',
		type: 'LOCAL',
		description: '',
		enabled: false,
		n3Store: ''
	};

	// Validation
	export let valid = false;
	export let validationEnabled = false;
	$: {
		valid = source.name.length > 0;
	}

	// Events
	function onSubmit() {
		if (valid) {
			handleSubmit({ ...source });
		} else {
			validationEnabled = true;
		}
	}

	function handleRemove() {
		// Probably should have some kind of "are you sure" functionality here haha
		sources.removeSource(source.id);
		goto(`${base}/sources`);
	}
</script>

{#if validationEnabled}
	<Alert
		variant="error"
		heading="There are some problems with this form"
		message="Please fix indicated errors to continue."
	/>
{/if}

<form on:submit|preventDefault={onSubmit} class="my-4" action="/sources">
	<TextField
		required
		label="Source Name"
		helperText="A unique name for your source to help you identify it in a list"
		isValid={source.name.length > 0}
		{validationEnabled}
		validationErrorMessage="Please provide a name for this source"
		bind:value={source.name}
	/>

	<TextField
		rows={3}
		label="Description"
		helperText="Brief description of this resource"
		bind:value={source.description}
	/>

	<div class="mt-4">
		<Button label="Submit" type="submit" />

		{#if source.id.length}
			<Button
				label="Remove Source"
				variant="destructive"
				type="reset"
				on:keyup
				on:click={handleRemove}
			/>
		{/if}
		<Link htmlClass="block mt-2" href="/sources">Back to Sources</Link>
	</div>
</form>
