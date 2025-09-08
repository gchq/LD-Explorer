<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Button, Link, TextField } from '$lib/components';
	import { type LocalSource, sources } from '$stores/sources/local-sources.store';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	// Props
	interface Props {
		onSubmit: (s: LocalSource, document?: string) => void;
		valid?: boolean;
		validationEnabled?: boolean;
		source?: LocalSource;
	}

	let {
		onSubmit,
		validationEnabled = false,
		source = $bindable({
			id: '',
			name: '',
			type: 'LOCAL',
			description: '',
			enabled: false,
			n3Store: undefined
		})
	}: Props = $props();

	let valid = $derived(source.name.length > 0);

	// Events
	function handleSubmit(e: Event) {
		e.preventDefault();

		if (valid) {
			onSubmit({ ...source });
		} else {
			validationEnabled = true;
		}
	}

	function handleRemove() {
		// TODO: Probably should have some kind of "are you sure" functionality here
		sources.removeSource(source.id);
		goto(resolve('/sources'));
	}
</script>

{#if validationEnabled}
	<Alert
		variant="error"
		heading="There are some problems with this form"
		message="Please fix indicated errors to continue."
	/>
{/if}

<form onsubmit={handleSubmit} class="my-4" action="/sources">
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
			<Button label="Remove Source" variant="destructive" type="reset" onclick={handleRemove} />
		{/if}
		<Link htmlClass="block mt-2" href="/sources">Back to Sources</Link>
	</div>
</form>
