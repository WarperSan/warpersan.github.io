<script lang="ts">
    import type { Snippet } from "svelte";
    import Prism from "prismjs";

    import "prismjs/components/prism-markup";
    import "prismjs/components/prism-clike";
    import "prismjs/components/prism-markup-templating";
    import "prismjs/components/prism-csharp";
    import "prismjs/components/prism-php";

    interface Props {
        lang: string;
        children?: Snippet;
    }

    let { lang, children }: Props = $props();

    function highlight(node: HTMLElement) {
        const code = node.textContent?.trim() || "";
        node.textContent = code;
        Prism.highlightElement(node);
    }
</script>

<pre class="language-{lang}"><code use:highlight class="language-{lang}"
        >{@render children?.()}</code
    ></pre>

<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/prismjs/themes/prism-tomorrow.css"
/>
