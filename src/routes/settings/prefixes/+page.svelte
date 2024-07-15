<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import {
		Button,
		Heading,
		Link,
		Paragraph as P,
		Table,
		TableBody,
		TableData,
		TableHead,
		TableHeading,
		TableRow,
		TextField
	} from '$lib/components';
	import { PageView } from '$lib/components/views';
	import type { Prefix } from '$lib/types';
	import { prefixes } from '$lib/stores/prefixes.store';

	// Form data
	let newLabel = '';
	let newIri = '';
	let submitted = false;
	$: labelValid = !!newLabel.length;
	$: iriValid = !!newIri.length;
	$: valid = iriValid && labelValid;

	// Events
	function addPrefix() {
		submitted = true;

		if (valid) {
			prefixes.update((current) => [...current, { label: newLabel, iri: newIri }]);
			newLabel = newIri = '';
			submitted = false;
		}
	}

	function removePrefix(prefix: Prefix) {
		prefixes.update((current) => [...current.filter((p) => p.iri != prefix.iri)]);
	}

	const restoreDefaultButtonLabel = {
		label: 'Restore Defaults',
		ariaLabel: 'Restore prefixes to defaults'
	};
</script>

<PageView heading="Prefixes" subheading="Manage common or custom prefixes">
	<Heading text="Add Prefix" tag="h3" variant="h4" />
	<P
		>Use this form to add a new prefix to the existing list. You can normally find common prefixes
		on <Link href="https://prefix.cc/" external>prefix.cc</Link>.</P
	>

	<form on:submit|preventDefault={addPrefix}>
		<TextField
			bind:value={newLabel}
			label="Label"
			validationEnabled={submitted}
			isValid={labelValid}
			placeholder="ex"
			validationErrorMessage="Please enter a valid label"
		/>
		<TextField
			bind:value={newIri}
			label="IRI"
			validationEnabled={submitted}
			type="url"
			isValid={iriValid}
			placeholder="http://www.example.com/"
			validationErrorMessage="Please enter a valid IRI"
		/>
		<Button label="Add Prefix" type="submit" />
	</form>

	<hr class="my-10" />

	<Heading text="Existing Prefixes" tag="h3" variant="h4" />
	<P
		>The following table shows the prefixes that LD Explorer currently understands. These can be
		abbreviated (depending on your terms settings) and are available to choose from any prefix
		browsers within the application.</P
	>

	<Button
		{...restoreDefaultButtonLabel}
		className="my-4"
		variant="destructive"
		on:click={prefixes.restore}
	/>

	<Table>
		<TableHead>
			<TableHeading value="Label" className="w-2/12" />
			<TableHeading value="IRI" className="w-10/12" />
		</TableHead>
		<TableBody>
			{#each $prefixes.sort((a, b) => (a.label < b.label ? -1 : 1)) as prefix}
				<TableRow>
					<TableData>
						{prefix.label}
					</TableData>
					<TableData>
						{prefix.iri}
						<div class="float-right">
							<Button
								label="Remove"
								ariaLabel={`Remove ${prefix.label}`}
								variant="destructive"
								on:click={() => removePrefix(prefix)}
								size="small"
							/>
						</div>
					</TableData>
				</TableRow>
			{/each}
		</TableBody>
	</Table>

	<Button
		{...restoreDefaultButtonLabel}
		className="my-4"
		variant="destructive"
		on:click={prefixes.restore}
	/>
</PageView>
