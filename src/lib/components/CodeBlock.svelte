<script lang="ts">
    import type { Snippet } from "svelte";
    import Prism from "prismjs";

    import "prismjs/components/prism-markup";
    import "prismjs/components/prism-clike";
    import "prismjs/components/prism-markup-templating";
    import "prismjs/components/prism-csharp";
    import "prismjs/components/prism-php";

    import CopyIcon from "virtual:icons/material-symbols/content-copy-outline";
    import CheckIcon from "virtual:icons/material-symbols/check-rounded";

    interface Props {
        lang: string;
        children?: Snippet;
    }

    let { lang, children }: Props = $props();
    let codeElement: HTMLElement;
    let copied = $state(false);
    let copyTimeout: number | null = null;

    function highlight(node: HTMLElement) {
        const code = node.textContent?.trim() || "";
        node.textContent = code;
        Prism.highlightElement(node);
    }

    function onClick() {
        navigator.clipboard.writeText(codeElement.textContent);
        copied = true;

        if (copyTimeout != null) clearTimeout(copyTimeout);

        copyTimeout = setTimeout(() => (copied = false), 2000);
    }
</script>

<div class="relative group">
    <button
        class="absolute top-2 right-2 p-1 rounded-md cursor-pointer select-none transition-bg duration-200 transition-opacity opacity-0 group-hover:opacity-100 hover:bg-[var(--bg)]"
        title="Copy Snippet"
        onclick={onClick}
    >
        {#if copied}
            <CheckIcon />
        {:else}
            <CopyIcon />
        {/if}
    </button>
    <pre class="language-{lang}"><code
            bind:this={codeElement}
            use:highlight
            class="language-{lang}">{@render children?.()}</code
        ></pre>
</div>

<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/prismjs/themes/prism-tomorrow.css"
/>
