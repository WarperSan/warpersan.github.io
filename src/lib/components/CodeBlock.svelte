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

    interface LanguageInfo {
        code: string;
        name: string;
    }

    let { lang, children }: Props = $props();
    let codeElement: HTMLElement;
    let copied = $state(false);
    let copyTimeout: number | null = null;
    let languageInfo: LanguageInfo = getLanguageInfo(lang);

    function highlight(node: HTMLElement) {
        const code = node.textContent?.trim() || "";
        node.textContent = code;
        Prism.highlightElement(node);
    }

    function onClick() {
        navigator.clipboard.writeText(codeElement.textContent);
        copied = true;

        if (copyTimeout != null) clearTimeout(copyTimeout);

        copyTimeout = setTimeout(() => (copied = false), 1500);
    }

    function getLanguageInfo(lang: string): LanguageInfo {
        switch (lang) {
            case "csharp":
                return { code: "csharp", name: "C#" };
            case "php":
                return { code: "php", name: "PHP" };
            default:
                return { code: lang, name: lang };
        }
    }
</script>

<div
    class="rounded bg-[var(--background-container)] overflow-hidden border-2 border-[var(--border-container)]"
>
    <div
        class="flex items-center px-3 py-1 border-b-2 border-[var(--border-container)]"
    >
        <span class="font-semibold">{languageInfo.name}</span>
        <div class="flex-1"></div>
        <button
            class="flex items-center gap-1 px-2 py-1 bg-[var(--background-input)] border border-[var(--border-input)] rounded-md cursor-pointer select-none hover:bg-[var(--hover-background)] hover:text-[var(--hover-text)] transition-colors duration-[var(--transition-delay)]"
            title="Copy Snippet"
            onclick={onClick}
        >
            {#if copied}
                <CheckIcon />
            {:else}
                <CopyIcon />
            {/if}
            <span>Copy</span>
        </button>
    </div>
    <div>
        <pre style="margin: 0; border-radius: 0;"><code
                bind:this={codeElement}
                use:highlight
                class="language-{languageInfo.code}"
                >{@render children?.()}</code
            ></pre>
    </div>
</div>

<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/prismjs/themes/prism-tomorrow.css"
/>
