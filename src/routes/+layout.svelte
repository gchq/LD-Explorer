<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import '../app.css';
	import { Footer, SideNav, SkipToContent } from '$lib/components';
	import { ViewportHelper } from '$lib/components/helpers';
	import { defineCustomElements } from '@ukic/web-components/loader';
	let isSmall: boolean;
</script>

<ViewportHelper bind:isSmall />

{#await defineCustomElements() then}
	<div class="tracking-wide leading-relaxed scheme-only-light text-icds-primary-text">
		<SkipToContent landmarkHref="#content" />
		<ic-theme brand-color="#0c857b">
			<main class="sm:flex h-full">
				<SideNav />
				<div id="content" tabIndex="-1" class="flex-row flex-grow">
					<div class="min-h-screen">
						<slot />
					</div>
					<ic-back-to-top target="main" variant={isSmall ? 'icon' : 'default'}></ic-back-to-top>
					<Footer />
				</div>
			</main>
		</ic-theme>
	</div>
{/await}
