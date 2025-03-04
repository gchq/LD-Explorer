<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import {
		Button,
		Link,
		Table,
		TableBody,
		TableData,
		TableHead,
		TableHeading,
		TableRow
	} from '$lib/components';
	import type { Prefix } from '$lib/types';
	import { prefixes } from '$lib/stores/prefixes.store';

	interface Props {
		document: string;
		onAddPrefix: (prefix: string) => void;
		description: string;
	}
	let { document, onAddPrefix, description }: Props = $props();

	// Utility Functions
	const formatPrefix = (prefix: Prefix) => `PREFIX ${prefix.label}: <${prefix.iri}>`;

	// Events
	function handleAddPrefix(prefix: Prefix) {
		onAddPrefix(formatPrefix(prefix));
	}
</script>

<ic-typography class="block my-6"
	>{description} If you can't see the prefix you are looking for in the list, you may be able to find
	it on <Link href="https://prefix.cc/" external>prefix.cc</Link>. You can edit this list from the <Link
		href="/settings/prefixes">prefix settings</Link
	> page.
</ic-typography>

<Table>
	<TableHead>
		<TableHeading value="Label" className="w-2/12" />
		<TableHeading value="IRI" className="w-10/12" />
	</TableHead>
	<TableBody>
		{#each $prefixes.sort((a, b) => (a.label < b.label ? -1 : 1)) as prefix (prefix.iri)}
			<TableRow>
				<TableData>
					{prefix.label}
				</TableData>
				<TableData>
					{prefix.iri}
					<div class="float-right">
						<Button
							label="Add"
							ariaLabel={`Add ${prefix.label}`}
							variant="tertiary"
							disabled={document.toLowerCase().includes(formatPrefix(prefix).toLowerCase())}
							onclick={() => handleAddPrefix(prefix)}
						/>
					</div>
				</TableData>
			</TableRow>
		{/each}
	</TableBody>
</Table>
