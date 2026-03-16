<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.ico";

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
	<link href="/styles/main.css" rel="stylesheet" />
	<link href="/styles/elements/header.css" rel="stylesheet" />
	<link href="/styles/elements/footer.css" rel="stylesheet" />
	<link href="/styles/fonts.css" rel="stylesheet" />
	<script src="/scripts/utils.js"></script>
	<script src="/scripts/elements/HeaderElement.js"></script>
	<script src="/scripts/elements/FooterElement.js"></script>
</svelte:head>

<custom-header></custom-header>

{@render children()}

<custom-footer></custom-footer>
