<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<custom-header></custom-header>

{@render children()}

<custom-footer></custom-footer>
