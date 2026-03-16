<script lang="ts">
    import type { Snippet } from "svelte";
    import BaseTip from "./BaseTip.svelte";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<BaseTip border="#d59df5" background="#2f293b">
    <strong>Learn more: </strong>
    {@render children?.()}
</BaseTip>
