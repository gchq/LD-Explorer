<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Link, Paragraph as P } from '$lib/components';
	import { PageView } from '$lib/components/views';
</script>

<PageView heading="About" subheading="Overview of this application">
	<div class="mt-4">
		<Alert
			variant="warning"
			heading="Prototype"
			message="This software is a prototype - it is not guaranteed to be bug free and should not be used for
			critical tasks."
		/>
		<P
			>LD-Explorer is a prototype tool that aims to put an end to the blockers and confusion around
			the use of RDF and Linked Data. Often, developers will discover the techniques on the way to
			meeting requirements like data interoperability or model flexibility, and then be put off by
			the steep and mostly academic-focussed learning curve and the lack of any tools that let you
			just "try it out". The hope is that this tool reduces the learning curve and enables
			discussion around the use of linked data to happen more easily.
		</P>
		<P>
			For more information about LD Explorer, please visit the project's <Link
				href="https://github.com/gchq/LD-Explorer/wiki"
				external>Github Wiki</Link
			>, which includes a <Link
				href="https://github.com/gchq/LD-Explorer/wiki/Getting-Started"
				external>tutorial</Link
			> to help you get started.
		</P>
	</div>
</PageView>
