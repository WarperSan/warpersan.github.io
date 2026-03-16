<script lang="ts">
    import type { Snippet } from "svelte";
    import Tip from "./Tip.svelte";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<Tip border="#f5d19d" background="#3B2B29">
    <strong>Warning: </strong>
    {@render children?.()}
</Tip>
