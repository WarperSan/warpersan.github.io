<script lang="ts">
    import type { Snippet } from "svelte";
    import BaseTip from "./BaseTip.svelte";
    import NoticeIcon from "virtual:icons/material-symbols/info-outline-rounded";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<BaseTip border="#9dcdf5" background="#29373b" title="Note" icon={NoticeIcon}>
    {@render children?.()}
</BaseTip>
