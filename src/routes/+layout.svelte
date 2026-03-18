<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.ico";
	import { assets, base } from "$app/paths";
    import Footer from "$lib/components/Footer.svelte";

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
	<link href="{assets}/styles/elements/header.css" rel="stylesheet" />
	<link href="{assets}/styles/elements/footer.css" rel="stylesheet" />
	<link href="{assets}/styles/fonts.css" rel="stylesheet" />
	<script src="{assets}/scripts/utils.js"></script>
	<script src="{assets}/scripts/elements/HeaderElement.js"></script>
	<script src="{assets}/scripts/elements/FooterElement.js"></script>
</svelte:head>

<custom-header></custom-header>

{@render children()}

<Footer />
