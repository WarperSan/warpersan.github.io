<script lang="ts">
    import type { Snippet } from "svelte";
    import BaseTip from "./BaseTip.svelte";
    import MenuBookIcon from "virtual:icons/material-symbols/menu-book-outline-rounded";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<BaseTip border="#d59df5" background="#2f293b" title="Learn more" icon={MenuBookIcon}>
    {@render children?.()}
</BaseTip>
