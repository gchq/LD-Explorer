<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Button, TextField } from '$lib/components';

	// Props
	interface Props {
		onSubmit: (iri: string) => void;
	}
	let { onSubmit }: Props = $props();
	let validationEnabled = $state(false);
	let iri = $state('');

	// Events
	function handleSubmit(e: Event) {
		e.preventDefault();
		validationEnabled = true;
		onSubmit(iri);
	}
</script>

<form onsubmit={handleSubmit} action="/sources">
	<TextField
		required
		type="url"
		label="IRI"
		helperText="The full IRI that you want to explore"
		placeholder="https://www.example.com/Foobar"
		isValid={iri.length > 0}
		{validationEnabled}
		validationErrorMessage="Please provide an IRI"
		bind:value={iri}
	/>
	<Button type="submit" label="Submit" />
</form>
