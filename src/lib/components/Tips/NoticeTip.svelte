<script lang="ts">
    import type { Snippet } from "svelte";
    import BaseTip from "./BaseTip.svelte";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<BaseTip border="#9dcdf5" background="#29373b">
    <strong>Note: </strong>
    {@render children?.()}
</BaseTip>
