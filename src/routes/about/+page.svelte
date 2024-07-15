<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Link, Paragraph as P } from '$lib/components';
	import { PageView } from '$lib/components/views';
</script>

<PageView heading="About" subheading="Overview of this application">
	<Alert
		heading="Prototype"
		variant="warning"
		message="This software is a prototype and should not be used for mission critical tasks in its current state."
	/>

	<div class="mt-4">
		<P>
			For more information about LD Explorer, please visit the project's <Link
				href="https://github.com/gchq/ld-explorer"
				external>Github repository</Link
			>.
		</P>
	</div>
</PageView>
