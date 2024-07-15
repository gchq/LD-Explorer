<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	export let landmarkHref: string;
</script>

<a
	data-sveltekit-reload
	href={landmarkHref}
	class="absolute right-2 -top-20 focus:top-2 z-50 drop-shadow-2xl border
		   ring-offset-2 focus:ring-4
           border-icds-hyperlink rounded-full py-2 px-4
           text-icds-hyperlink text-center font-semibold
           hover:bg-icds-action-bg-hover-no-alpha bg-white
           transition-all"
>
	Skip to main content
</a>
