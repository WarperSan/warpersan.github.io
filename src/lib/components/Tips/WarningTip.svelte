<script lang="ts">
    import type { Snippet } from "svelte";
    import BaseTip from "./BaseTip.svelte";
    import WarningIcon from "virtual:icons/material-symbols/warning-outline-rounded";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<BaseTip border="#f5d19d" background="#3B2B29" title="Warning" icon={WarningIcon}>
    {@render children?.()}
</BaseTip>
