<script lang="ts">
    import type { Snippet } from "svelte";
    import BaseTip from "./BaseTip.svelte";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<BaseTip border="#f5d19d" background="#3B2B29">
    <strong>Warning: </strong>
    {@render children?.()}
</BaseTip>
