<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { resolve } from '$app/paths';
	import { Alert, Button, Link, Paragraph as P, TextField } from '$lib/components';
	import { type RemoteSource, sources } from '$stores/sources/remote-sources.store';
	import { goto } from '$app/navigation';

	interface Props {
		onSubmit: (s: RemoteSource) => void;
		source?: RemoteSource;
	}

	let {
		onSubmit,
		source = $bindable({
			id: '',
			type: 'REMOTE',
			name: '',
			description: '',
			url: '',
			enabled: false
		})
	}: Props = $props();

	let url: string = $state(source.url);
	let validationEnabled = $state(false);

	// TODO: Could also validate that the string entered is a valid URL.
	// TODO: In fact all of the validation logic in this form is in need of a refactor.
	let valid = $derived(source.name.length > 0 && url.length > 0);

	// Events
	function handleSubmit(e: Event) {
		e.preventDefault();
		if (valid) {
			onSubmit({ ...source, url });
		} else {
			validationEnabled = true;
		}
	}

	function handleRemove() {
		// Probably should have some kind of "are you sure" functionality here haha
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
<P>
	See the Comunica website for a full list of <Link
		external
		href="https://comunica.dev/docs/query/advanced/source_types/#supported-source-types"
		>supported source types</Link
	>. Supported sources include SPARQL endpoints and RDF files in most major formats (including
	RDFa-decorated web pages).
</P>
<form onsubmit={handleSubmit} class="mt-8 mb-4" action="/sources">
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

	<TextField
		required
		label="URL"
		type="url"
		helperText="Location of the remote resource (e.g. an RDF file, a SPARQL endpoint or a fragments interface) "
		isValid={url.length > 0}
		{validationEnabled}
		validationErrorMessage="Please provide a remote location for this source"
		bind:value={url}
	/>

	<div class="mt-4">
		<Button label="Submit" type="submit" />

		{#if source.id.length}
			<Button label="Remove Source" variant="destructive" type="reset" onclick={handleRemove} />
		{/if}

		<Link htmlClass="block mt-2" href={resolve('/sources')}>Back to Sources</Link>
	</div>
</form>
