<script lang="ts">
    import MenuIcon from "virtual:icons/material-symbols/menu-rounded";
    import CloseIcon from "virtual:icons/material-symbols/close-rounded";
    import { onMount } from "svelte";

    let isMenuOpened = $state(false);
    let menuBtn: HTMLButtonElement | null = null;
    let iconsList: HTMLUListElement | null = null;

    function onMenuClicked(event: MouseEvent) {
        isMenuOpened = !isMenuOpened;

        event.stopPropagation();
    }

    onMount(() => {
        window.addEventListener("click", (event) => {
            console.log("click");
            if (!isMenuOpened) return;

            const target = event.target as HTMLElement;

            if (menuBtn != null && menuBtn.contains(target)) return;
            if (iconsList != null && iconsList.contains(target)) return;

            isMenuOpened = false;
        });
    });
</script>

<header
    class="flex z-[100] fixed items-center justify-end bg-[color:var(--background-container)] select-none px-4 py-2 top-0 inset-x-0 h-10 border-b border-b-[var(--border-container)]"
>
    <button
        id="headerMenu"
        class="hidden max-sm:block text-[var(--text-primary)] text-2xl cursor-pointer border-[none]"
        onclick={onMenuClicked}
        bind:this={menuBtn}
    >
        {#if isMenuOpened}
            <CloseIcon />
        {:else}
            <MenuIcon />
        {/if}
    </button>
    <ul
        id="headerIcons"
        class="{isMenuOpened
            ? 'open'
            : ''} flex items-center gap-5 list-none m-0 p-0"
        bind:this={iconsList}
    >
        <li>
            <a href="/" class="headerIcon" title="Home"
                ><i class="fa-solid fa-house"></i><span>Home</span></a
            >
        </li>
        <li>
            <a href="/pages/about-me" class="headerIcon" title="About Me"
                ><i class="fa-solid fa-user"></i><span>About Me</span></a
            >
        </li>
        <li>
            <a href="/pages/articles" class="headerIcon" title="Articles"
                ><i class="fa-solid fa-newspaper"></i><span>Articles</span></a
            >
        </li>
        <li>
            <a href="/pages/projects" class="headerIcon" title="Projects"
                ><i class="fa-solid fa-box-archive"></i><span>Projects</span></a
            >
        </li>
        <li>
            <a href="/pages/tools" class="headerIcon" title="Online Tools"
                ><i class="fa-solid fa-wrench"></i><span>Online Tools</span></a
            >
        </li>
    </ul>
</header>

<style>
    .headerIcon {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;

        padding: 0.2rem;

        color: var(--text-primary);
        text-decoration: none;

        border-radius: 0.3rem;
        transition: all var(--transition-delay) ease-in-out;
    }

    .headerIcon:hover {
        color: var(--hover-text);
        background-color: var(--hover-background);
    }

    #headerIcons > li {
        margin: 0;
    }

    @media (max-width: 640px) {
        #headerIcons {
            display: none;
            position: absolute;
            top: 100%;
            right: 10px;

            flex-direction: column;
            align-items: flex-start;

            border-radius: 0 0 1em 1em;

            background: var(--background-container);
            padding: 20px;

            border-color: var(--border-container);
            border-width: 0 1px 1px 1px;
        }

        #headerIcons.open {
            display: flex;
        }

        #headerIcons > li {
            width: 100%;
        }
    }
</style>
