<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		border: string;
        background: string;
		children?: Snippet;
	}

	let {
		border,
        background,
		children
	}: Props = $props();
</script>

<div class="p-4 border-l-4 rounded-r-md my-6" style="border-color: {border}; background-color: {background};">
    {@render children?.()}
</div>