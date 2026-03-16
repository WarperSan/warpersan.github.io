<script>
	import "../app.css";
	import favicon from "$lib/assets/favicon.ico";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<custom-header></custom-header>

<div class="bg-sky-950">
{@render children()}
</div>

<custom-footer></custom-footer>
