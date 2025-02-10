<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import {
		Button,
		Heading,
		Switch,
		Table,
		TableBody,
		TableData,
		TableHead,
		TableHeading,
		TableRow,
		Term
	} from '$lib/components';
	import { DataFactory } from 'n3';
	import { PageView } from '$lib/components/views';
	import { settings, type Settings } from '$lib/stores/settings.store';

	// State (the "dirty" settings are the ones which are in-flight and have not yet been applied)
	const dirtySettings = {
		term__showNodeType: $settings.term__showNodeType,
		term__abbreviateCommonPrefixes: $settings.term__abbreviateCommonPrefixes,
		term__showLanguageTag: $settings.term__showLanguageTag
	};
	let dirty = false;

	// Events
	function handleApplySettings(e: Event) {
		e.preventDefault();

		settings.update((current) => ({
			...current,
			...dirtySettings
		}));
		dirty = false;
	}

	// Example terms for preview
	const namedNodeExample = DataFactory.namedNode('http://xmlns.com/foaf/0.1/Person');
	const literalExample = DataFactory.literal('Bob Smith', 'en');
	const blankNodeExample = DataFactory.blankNode('_example');
</script>

<PageView
	heading="Terms Settings"
	subheading="Adjust various settings around the appearance of terms within the app"
>
	<Heading text="Preview" tag="h3" variant="h4" />
	<section aria-live="polite" class="border border-gray-200 px-4 pb-2 mb-8">
		<Table>
			<TableHead>
				<TableHeading value="Term Type" />
				<TableHeading value="Appearance" />
			</TableHead>
			<TableBody>
				<TableRow>
					<TableData>Resource</TableData>
					<TableData
						><Term term={namedNodeExample} settings={dirtySettings as Settings} /></TableData
					>
				</TableRow>
				<TableRow>
					<TableData>Literal</TableData>
					<TableData><Term term={literalExample} settings={dirtySettings as Settings} /></TableData>
				</TableRow>
				<TableRow includeBottomBorder={false}>
					<TableData>Blank Node</TableData>
					<TableData>
						<Term term={blankNodeExample} settings={dirtySettings as Settings} />
					</TableData>
				</TableRow>
			</TableBody>
		</Table>
	</section>

	<Heading text="Settings" tag="h3" variant="h4" />
	<form onsubmit={handleApplySettings}>
		<Switch
			label="Show Node Type"
			helperText="Whether to display the node-type (e.g. NamedNode, Literal) alongside terms."
			bind:checked={dirtySettings.term__showNodeType}
			onchange={() => (dirty = true)}
		/>

		<Switch
			label="Abbreviate Common Prefixes"
			helperText="Whether to abbreviate commonly used prefixes such as OWL, RDF and FOAF."
			bind:checked={dirtySettings.term__abbreviateCommonPrefixes}
			onchange={() => (dirty = true)}
		/>

		<Switch
			label="Show Language Tag"
			helperText="Whether to show the language tag on literals."
			bind:checked={dirtySettings.term__showLanguageTag}
			onchange={() => (dirty = true)}
		/>
		<div class="mt-10">
			<Button label="Apply" type="submit" disabled={!dirty} />
		</div>
	</form>
</PageView>
