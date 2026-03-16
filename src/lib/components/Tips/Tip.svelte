<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        border: string;
        background: string;
        children?: Snippet;
    }

    let { border, background, children }: Props = $props();
</script>

<div
    class="p-4 border-l-4 my-6 rounded-r-md"
    style="border-color: {border}; background-color: {background};"
>
    {@render children?.()}
</div>
