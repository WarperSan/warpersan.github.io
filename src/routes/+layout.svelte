<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.ico";
	import { assets, base } from "$app/paths";
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="author" content="WarperSan" />
	<meta name="description" content="Portfolio of WarperSan" />
	<meta name="keywords" content="Portfolio, WarperSan, Projects" />
	<title>WarperSan</title>

	<!-- GENERIC -->
	<link href="{assets}/styles/main.css" rel="stylesheet" />
	<link href="{assets}/styles/fonts.css" rel="stylesheet" />
    <link href="{assets}/styles/theme.css" rel="stylesheet" />
	<script src="{assets}/scripts/utils.js"></script>
</svelte:head>

<Header />

<div class="mt-14 mb-6">
	{@render children()}
</div>

<Footer />
