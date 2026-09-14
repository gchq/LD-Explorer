<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import {
		Alert,
		Button,
		Heading,
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
	import { sources as localSources } from '$stores/sources/local-sources.store';
	import { validateLocalSourcesWithShacl, type ShaclValidationSummary } from '$lib/util/shacl';

	let shapesDocument = $state('');
	let report = $state<ShaclValidationSummary | undefined>();
	let error = $state('');
	let validationEnabled = $state(false);
	let validating = $state(false);
	let enabledLocalSources = $derived(
		$localSources.filter((source) => source.enabled && source.n3Store)
	);
	let validShapesDocument = $derived(shapesDocument.trim().length > 0);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		validationEnabled = true;
		error = '';
		report = undefined;
		if (!validShapesDocument || enabledLocalSources.length === 0) return;

		validating = true;
		try {
			report = await validateLocalSourcesWithShacl($localSources, shapesDocument);
		} catch (err) {
			error = err instanceof Error ? err.message : 'SHACL validation failed.';
		} finally {
			validating = false;
		}
	}
</script>

<PageView
	heading="SHACL Validation"
	subheading="Validate enabled local RDF sources against SHACL shapes."
>
	<P>
		Paste a SHACL shapes document below. Validation runs in the browser against enabled local data
		sources. Remote SPARQL sources are not included. Core SHACL constraints are supported;
		SHACL-SPARQL constraints are not.
	</P>

	{#if enabledLocalSources.length === 0}
		<Alert
			variant="warning"
			heading="No enabled local sources"
			message="Enable or add a local data source before running SHACL validation."
		/>
	{:else}
		<P>
			Validating {enabledLocalSources.length} enabled local source{enabledLocalSources.length === 1
				? ''
				: 's'}: <strong>{enabledLocalSources.map((source) => source.name).join(', ')}</strong>.
		</P>
	{/if}

	<form onsubmit={handleSubmit}>
		<TextField
			codeEditor
			required
			rows={14}
			label="SHACL shapes"
			helperText="Supported RDF syntaxes are Turtle, TriG, N-Triples, and N-Quads."
			bind:value={shapesDocument}
			{validationEnabled}
			isValid={validShapesDocument}
			validationErrorMessage="Please provide a SHACL shapes document."
		/>
		<Button
			label={validating ? 'Validating' : 'Validate'}
			type="submit"
			disabled={validating || enabledLocalSources.length === 0}
		/>
	</form>

	{#if error}
		<Alert variant="error" heading="SHACL validation error" message={error} />
	{/if}

	{#if report}
		<Heading text="Validation results" tag="h2" />
		{#if report.conforms}
			<Alert
				variant="success"
				heading="Data conforms"
				message={`Validated ${report.dataQuadCount} data quads against ${report.shapeQuadCount} shape quads.`}
			/>
		{:else}
			<Alert
				variant="warning"
				heading="Data does not conform"
				message={`${report.results.length} SHACL validation result${report.results.length === 1 ? '' : 's'} found.`}
			/>

			<Table>
				<TableHead>
					<TableHeading value="Focus node" />
					<TableHeading value="Path" />
					<TableHeading value="Severity" />
					<TableHeading value="Constraint" />
					<TableHeading value="Message" />
				</TableHead>
				<TableBody>
					{#each report.results as result, index (index)}
						<TableRow>
							<TableData>{result.focusNode}</TableData>
							<TableData>{result.path}</TableData>
							<TableData>{result.severity}</TableData>
							<TableData>{result.sourceConstraintComponent}</TableData>
							<TableData>{result.message}</TableData>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		{/if}
	{/if}
</PageView>
