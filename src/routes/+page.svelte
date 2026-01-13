<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { ButtonLink, Heading, HtmlHead, Link, Paragraph as P } from '$lib/components';
	import { Logo } from '$lib/components/ui/icons';
	import ProductFeature from '$lib/components/layout/homepage/ProductFeature.svelte';
	import { asset } from '$app/paths';
</script>

<HtmlHead title="Home" />

<ic-hero
	subheading="The missing tool for easily exploring and experimenting with linked data resources directly from the browser."
	aligned="center"
	background-image={asset('/hero-bg.svg')}
>
	<div slot="heading" class="mb-4">
		<Heading tag="h2" variant="h1" text="LD-Explorer" applyVerticalMargins={false}>
			{#snippet beforeText()}
				<span class="inline-block w-[34px] h-[34px] relative top-px stroke-none fill-current">
					<Logo />
				</span>
			{/snippet}
		</Heading>
	</div>
	<div slot="interaction">
		<ButtonLink
			label="Get Started"
			variant="primary"
			external
			href="https://github.com/gchq/LD-Explorer/wiki/Getting-Started"
		/>
	</div>

	<div slot="interaction">
		<ButtonLink
			label="FAQ"
			variant="secondary"
			external
			href="https://github.com/gchq/LD-Explorer/wiki/FAQ"
		/>
	</div>
</ic-hero>

<div class="bg-gray-100 dark:bg-gray-800 text-center md:text-left px-4">
	<ic-section-container align="full-width" class="md:grid md:grid-cols-2 m-auto max-w-6xl p-4">
		<div class="mr-4 py-4">
			<Heading text="The Problem" tag="h2" variant="h3" />
			<P>
				You are interested in analysing data from one or more structured datasets. The data is
				heterogeneous and unpredictable, so agreeing to a single schema to cover all use cases ahead
				of time is unrealistic. Under these conditions, how should you model your data?
			</P>
		</div>
		<div class="ml-4 py-4">
			<Heading text="The Solution" tag="h2" variant="h3" />
			<P>
				One solution is to apply <Link href="https://en.wikipedia.org/wiki/Linked_data" external
					>Linked Data</Link
				> principles to your data, transforming unrelated structured datasets into flexible, inter-related
				and self-describing graphs. The learning curve associated with these approaches is often steep,
				with resources often being aimed towards the academic/expert end of the learning spectrum. LD
				Explorer aims to provide an easier path for learning, experimentation and exploration.
			</P>
		</div>
	</ic-section-container>
</div>

<div
	class="bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-16 border-b border-b-gray-100 dark:border-b-gray-600 mb-4"
>
	<ic-section-container align="center" class="font-medium m-auto max-w-6xl">
		<p>
			LD-Explorer is a browser-based user interface running on top of the open-source <Link
				href="https://comunica.dev/"
				external>Comunica</Link
			> querying framework. Its core aim is to demystify and democratize linked-data techniques, flattening
			the learning curve and lowering the barrier to entry.
		</p>
	</ic-section-container>
</div>

<div class="m-auto max-w-6xl">
	<ic-section-container align="center" id="product-features" class="m-auto max-w-6xl px-4 md:pt-10">
		<Heading tag="h2" text="Product Features" applyVerticalMargins />
		<ProductFeature
			title="Query and federate multiple data sources"
			screenshot="/screenshots/data-sources-screenshot.png"
			screenshotAlt="Screenshot of data sources functionality"
		>
			<P>
				Powered by the <Link href="https://comunica.dev/" external>Comunica</Link> query engine, LD-Explorer
				provides an interface allowing users to define both local and remote sources in many different
				linked-data formats such as <Link
					htmlClass="break-keep"
					href="https://json-ld.org/"
					external>JSON-LD</Link
				>, <Link href="https://en.wikipedia.org/wiki/TriG_(syntax)" external>TriG</Link> and <Link
					href="https://en.wikipedia.org/wiki/Turtle_(syntax)"
					external>Turtle</Link
				>.
			</P>
			<P>
				Various remote interfaces are supported (e.g. SPARQL endpoints, Linked-Data Fragments,
				Static Files or RDFa-decorated web pages). You can also simply paste your data directly into
				the browser.
			</P>
		</ProductFeature>

		<ProductFeature
			title="Explore linked data"
			screenshot="/screenshots/describe-screenshot.png"
			screenshotAlt="Screenshot of data sources functionality"
			align="right"
		>
			<P>
				Once you have set up one or more data sources, you can start exploring the data using
				several built-in queries that take advantage of the self-describing nature of linked data.
			</P>
			<P>
				Use this functionality to get a feel for the kind of data that exists within a your data
				sources or to browse for a particular piece of data that you are interested in.
			</P>
		</ProductFeature>

		<ProductFeature
			title="Find knowledge connections"
			screenshot="/screenshots/graph-screenshot.png"
			screenshotAlt="Screenshot of data sources functionality"
		>
			<P>
				Because queries are federated across all active data sources, LD-explorer can help to
				uncover previously hidden connections between datasets, or to infer and create new ones.
			</P>
			<P>
				Even if two datasets look completely different and are created non-collaboratively by
				seperate authors, linked data principles can be applied to make them compatible - LD
				Explorer enables you to prototype this kind of functionality directly within the browser.
			</P>
		</ProductFeature>

		<ProductFeature
			title="Perform advanced queries"
			screenshot="/screenshots/sparql-screenshot.png"
			screenshotAlt="Screenshot of data sources functionality"
			align="right"
		>
			<P>
				If the built-in queries are not enough and you want to create something a bit more bespoke,
				you can use the built-in SPARQL query editor to write custom query logic. As with everything
				in LD-explorer, these queries will be run across all active data sources.
			</P>
			<P>
				The results of any SPARQL CONSTRUCT Queries can also be persisted to local data sources,
				allowing you to reshape your knowledge and perform complex inference.
			</P>
		</ProductFeature>
	</ic-section-container>
</div>

<div class="md:mt-6 px-4 text-center mb-20">
	<ic-section-container align="full-width" class="m-auto max-w-6xl">
		<Heading tag="h2" text="Built using open-source technology" />
		<P
			>This software was made possible by several incredible libraries within the linked-data
			JavaScript ecosystem, with much of the underlying data capabilities being provided by <Link
				href="https://comunica.dev/"
				external>Comunica</Link
			>
			and <Link href="https://github.com/rdfjs/N3.js/" external>N3</Link>. Details about both of
			these libraries as well as the specificaitons they are both built upon can be found on the <Link
				href="https://rdf.js.org/#"
				external>RDFJS website</Link
			>.</P
		>

		<div class="pt-8">
			<ButtonLink
				label="Learn more"
				ariaLabel="Learn more about LD Explorer"
				variant="primary"
				href="/about"
				size="large"
			/>
		</div>
	</ic-section-container>
</div>
