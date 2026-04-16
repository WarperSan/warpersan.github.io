<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.ico";
	import { asset, resolve } from "$app/paths";
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
	<link href={asset("/styles/main.css")} rel="stylesheet" />
	<link href={asset("/styles/fonts.css")} rel="stylesheet" />
    <link href={asset("/styles/theme.css")} rel="stylesheet" />
	<script src={asset("/scripts/utils.js")}></script>
</svelte:head>

<Header />

<div class="mt-14 mb-6">
	{@render children()}
</div>

<Footer />
