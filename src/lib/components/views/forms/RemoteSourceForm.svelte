<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Button, Link, Paragraph as P, TextField } from '$lib/components';
	import { type RemoteSource, sources } from '$stores/sources/remote-sources.store';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	// Props
	export let handleSubmit: (s: RemoteSource) => void;

	// Form Data (including default values for new sources)
	export let source: RemoteSource = {
		id: '',
		type: 'REMOTE',
		name: '',
		description: '',
		url: '',
		enabled: false
	};
	let url: string = source.url as string;

	// Validation
	export let valid = false;
	export let validationEnabled = false;
	$: {
		valid = source.name.length > 0 && url.length > 0;
	}

	// Events
	function onSubmit() {
		if (valid) {
			handleSubmit({ ...source, url });
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
<P>
	See the Comunica website for a full list of <Link
		external
		href="https://comunica.dev/docs/query/advanced/source_types/#supported-source-types"
		>supported source types</Link
	>. Supported sources include SPARQL endpoints and RDF files in most major formats (including
	RDFa-decorated web pages).
</P>
<form on:submit|preventDefault={onSubmit} class="mt-8 mb-4" action="/sources">
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
		<Link htmlClass="block mt-2" href="/sources">Back to Sources</Link>
	</div>
</form>
