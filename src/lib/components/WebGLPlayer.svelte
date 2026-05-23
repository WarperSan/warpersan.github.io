<script lang="ts">
    import ErrorIcon from "virtual:icons/material-symbols/error-outline-rounded";
    import PlayIcon from "virtual:icons/material-symbols/play-arrow-rounded";
    import FullscreenIcon from "virtual:icons/material-symbols/fullscreen-rounded";
    import ComputerIcon from "virtual:icons/material-symbols/computer-outline-rounded";
    import MobileIcon from "virtual:icons/material-symbols/mobile-3-outline";
    import { isOnMobile } from "$lib/utils/host-checks";
    import { mount, onMount } from "svelte";

    interface Props {
        mobile?: boolean;
        pc?: boolean;
        src: string;
    }

    const { mobile = false, pc = false, src }: Props = $props();

    // svelte-ignore state_referenced_locally
    const isSupported = pc || (mobile && isOnMobile());

    let started = false;
    let overlay: HTMLElement | null = $state(null);
    let iframe: HTMLIFrameElement | null = null;

    function play() {
        started = true;
        overlay?.classList.add("hidden");

        if (iframe != null) iframe.src = src;
    }

    function fullscreen() {
        iframe?.requestFullscreen({ navigationUI: "show" });
    }

    function onLoad() {
        if (!started) return;

        const canvas = iframe?.contentDocument?.querySelector("canvas");
        if (!canvas) return;

        Object.assign(canvas.style, {
            width: "100%",
            height: "100%",
            aspectRatio: "16/9",
        });
    }
</script>

<div
    class="max-w-full w-[960px] overflow-hidden border border-[var(--border-container)] border-solid rounded-xl"
>
    <div class="relative w-full aspect-video bg-black select-none">
        <!-- Game -->
        <iframe
            bind:this={iframe}
            onload={onLoad}
            title="Game"
            scrolling="no"
            class="h-full w-full"
        ></iframe>

        {#if isSupported}
            <!-- Play Overlay -->
            <button
                bind:this={overlay}
                class="group cursor-pointer absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--text-primary)] bg-black"
                onclick={play}
            >
                <span
                    class="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-input)] bg-[var(--button-primary)] text-3xl group-hover:bg-[var(--hover-background)]"
                >
                    <PlayIcon />
                </span>
                <span class="text-xs">Click to play</span>
            </button>
        {:else}
            <!-- Platform not supported Overlay -->
            <div
                class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black"
                role="img"
                aria-label="Not compatible on this device"
            >
                <span
                    class="flex h-14 w-14 items-center justify-center text-3xl text-red-400"
                >
                    <ErrorIcon />
                </span>
                <span class="text-xs text-[var(--text-primary)]">
                    Not compatible on this device
                </span>
            </div>
        {/if}
    </div>

    <!-- toolbar -->
    <div
        class="flex items-center justify-between rounded-b-2xl border-t border-[color:var(--border-input)] bg-[color:var(--background-container)] px-4 py-2.5"
    >
        <div class="flex gap-2">
            {#if pc}
                <span class="badge" title="PC">
                    <ComputerIcon class="text-sm" /> PC
                </span>
            {/if}
            {#if mobile}
                <span class="badge" title="Mobile">
                    <MobileIcon class="text-sm" /> Mobile
                </span>
            {/if}
        </div>

        <button
            onclick={fullscreen}
            disabled={!isSupported}
            class="icon-btn"
            aria-label="Fullscreen"
            title="Fullscreen"
        >
            <FullscreenIcon />
        </button>
    </div>
</div>

<style>
    .badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;

        padding: 3px 10px;

        color: var(--text-secondary);
        background: var(--background-input);
        font-size: 0.75rem;

        border-radius: 6px;
        border: 1px solid var(--border-input);

        user-select: none;
    }

    .icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        border: 1px solid var(--border-input);
        background: transparent;
        color: var(--text-secondary);
        cursor: pointer;
        transition:
            background 0.1s,
            color 0.1s;
    }

    .icon-btn:disabled {
        cursor: not-allowed;
        opacity: 30%;
    }

    .icon-btn:hover:not(:disabled) {
        background: var(--hover-background);
        color: var(--hover-text);
    }
</style>
