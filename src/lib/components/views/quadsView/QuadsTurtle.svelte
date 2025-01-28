<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { type Quad, Writer } from 'n3';

	interface Props {
		quads: Quad[];
	}
	let { quads }: Props = $props();

	const writer = new Writer({ format: 'application/ttl' });
	let ttl: string = $state('');

	writer.addQuads(quads);
	writer.end((err, doc) => {
		ttl = doc;
	});
</script>

<ic-text-field
	full-width
	class="font-mono mt-4 mb-2"
	value={ttl}
	label="RDF Document"
	rows={30}
	helper-text="RDF document in Turtle (ttl) format."
></ic-text-field>
