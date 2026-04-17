<script lang="ts">
    import ErrorIcon from "virtual:icons/material-symbols/error-outline-rounded";
    import PlayIcon from "virtual:icons/material-symbols/play-arrow-rounded";
    import FullscreenIcon from "virtual:icons/material-symbols/fullscreen-rounded";
    import ComputerIcon from "virtual:icons/material-symbols/computer-outline-rounded";
    import MobileIcon from "virtual:icons/material-symbols/mobile-3-outline";
    import { isOnMobile } from "$lib/utils/host-checks";

    interface Props {
        mobile?: boolean;
        pc?: boolean;
        src: string;
    }

    const { mobile = false, pc = false, src }: Props = $props();

    // svelte-ignore state_referenced_locally
    const isSupported = (mobile && isOnMobile()) || pc;

    let overlayElement: HTMLElement | null = null;
    let playerElement: HTMLIFrameElement | null = null;

    function onClickToPlay() {
        if (overlayElement != null) overlayElement.classList.add("hidden");

        if (playerElement == null) return;

        playerElement.src = src;
    }

    function onFullScreenRequested() {
        if (playerElement == null) return;

        playerElement.requestFullscreen.call(playerElement);
    }

    function onPlayerLoad() {
        if (playerElement == null) return;

        const iframeDoc = playerElement.contentDocument;

        if (iframeDoc == null) return;

        const gameCanvas = iframeDoc.querySelector("canvas");

        if (!gameCanvas) return;

        gameCanvas.addEventListener("blur", () => {
            if (overlayElement == null) return;
            overlayElement.style.display = "block";
            overlayElement.style.pointerEvents = "none";
        });

        gameCanvas.addEventListener("focus", () => {
            if (overlayElement == null) return;
            overlayElement.style.display = "none";
        });

        Object.assign(gameCanvas.style, {
            width: "100%",
            height: "100%",
            aspectRatio: "16 / 9",
        });
    }
</script>

<div class="relative flex flex-col w-[960px] h-fit max-w-full max-h-full bg-[color:var(--bg-panel)] border-[color:var(--border)] overflow-hidden my-4 rounded-2xl border-4">
    <div class="relative">
        <iframe
            title="Game"
            class="w-full aspect-video"
            allowtransparency
            frameborder="0"
            scrolling="no"
            bind:this={playerElement}
            onload={onPlayerLoad}
        >
        </iframe>
        <button
            class="absolute bg-[black] opacity-50 cursor-pointer select-none inset-0"
            title={isSupported ? "Click to Play" : "Not Compatible"}
            onclick={isSupported ? onClickToPlay : () => {}}
            bind:this={overlayElement}
        >
            <i class="w-fit h-fit block m-auto text-5xl">
                {#if isSupported}
                    <PlayIcon class="text-[lime]" />
                {:else}
                    <ErrorIcon class="text-[red]" />
                {/if}
            </i>
            {#if !isSupported}
                <span>Not Compatible</span>
            {/if}
        </button>
    </div>
    <div
        class="flex flex-1 bg-[color:var(--bg)] border-t-[color:var(--border)] px-[1em] py-[0.5em] border-t"
    >
        <div class="flex flex-row flex-1 gap-4">
            {#if pc}
                <i title="PC"><ComputerIcon /></i>
            {/if}
            {#if mobile}
                <i title="Mobile"><MobileIcon /></i>
            {/if}
        </div>
        <div class="flex flex-1 flex-row-reverse gap-4">
            <button
                title="Fullscreen"
                class="text-white"
                onclick={onFullScreenRequested}
            >
                <FullscreenIcon />
            </button>
        </div>
    </div>
</div>
