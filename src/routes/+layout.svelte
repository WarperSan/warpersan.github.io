<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.ico";
	import { onMount } from "svelte";
    import Footer from "$lib/components/Footer.svelte";

	let { children } = $props();

	function onHeaderMenuClicked() {
		const iconsList = document.querySelector("#headerIcons");

		if (iconsList != null) iconsList.classList.toggle("open");
	}

	onMount(() => {
		window.addEventListener("click", (event) => {
			const target = event.target as HTMLElement;
			const iconsList = document.querySelector("#headerIcons");

			if (iconsList == null) return;
			if (!iconsList.classList.contains("open")) return;

			const menuBtn = document.querySelector("#headerMenu");
			if (menuBtn != null && menuBtn.contains(target)) return;

			if (iconsList.contains(target)) return;

			iconsList.classList.remove("open");
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header
	class="flex fixed top-0 left-0 right-0 px-[1rem] py-[0.5rem] items-center justify-end select-none bg-[var(--main)]"
>
	<!-- MENU BTN -->
	<button
		id="headerMenu"
		class="hidden text-white text-2xl cursor-pointer fa-solid"
		onclick={onHeaderMenuClicked}
		aria-label="Hambuger Menu"
	>
	</button>
	<!-- ICONS LIST -->
	<ul id="headerIcons">
		<li>
			<a href="/" class="headerIcon" title="Home">
				<i class="fa-solid fa-house"></i>
				<span>Home</span>
			</a>
		</li>
		<li>
			<a href="/pages/about-me" class="headerIcon" title="About Me">
				<i class="fa-solid fa-user"></i>
				<span>About Me</span>
			</a>
		</li>
		<li>
			<a href="/pages/articles" class="headerIcon" title="Articles">
				<i class="fa-solid fa-newspaper"></i>
				<span>Home</span>
			</a>
		</li>
		<li>
			<a href="/pages/projects" class="headerIcon" title="Projects">
				<i class="fa-solid fa-box-archive"></i>
				<span>Projects</span>
			</a>
		</li>
		<li>
			<a href="/pages/tools" class="headerIcon" title="Online Tools">
				<i class="fa-solid fa-wrench"></i>
				<span>Online Tools</span>
			</a>
		</li>
	</ul>
</header>

<article class="p-8 mt-12 rounded-lg">
	{@render children()}
</article>

<Footer></Footer>

<style>
	header :global {
		.headerIcon {
			display: flex;
			align-items: baseline;
			gap: 0.5rem;
			color: white;
			text-decoration: none;
			padding: 0.2rem;
			border-radius: 0.3rem;
			transition: all 0.2s ease-in-out;
		}

		.headerIcon:hover {
			background-color: var(--dark);
		}

		#headerIcons {
			display: flex;
			gap: 20px;
			list-style: none;
			margin: 0;
			padding: 0;
		}

		@media (max-width: 6140px) {
			#headerMenu {
				display: block;
			}

			#headerMenu::after {
				content: "\f0c9";
			}

			header:has(#headerIcons.open) #headerMenu::after {
				content: "\f00d";
			}

			#headerIcons {
				display: none;
				position: absolute;
				top: 100%;
				right: 10px;

				flex-direction: column;

				border-radius: 0 0 1em 1em;

				background: var(--bg);
				padding: 20px;
			}

			#headerIcons.open {
				display: flex;
			}
		}
	}
</style>
