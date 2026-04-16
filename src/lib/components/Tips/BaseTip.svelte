<script lang="ts">
	import type { Component, Snippet } from "svelte";

	interface Props {
		border: string;
		background: string;
		title: string;
		icon: Component;
		children?: Snippet;
	}

	let { border, background, title, icon: Icon, children }: Props = $props();
</script>

<div
	class="p-4 border-l-4 rounded-r-md my-6"
	style="border-color: {border}; background-color: {background};"
>
	<span class="flex items-center gap-1 select-none">
		<Icon color={border} style="display: inline-block;"/>
		<strong>{title}</strong>
	</span>
	{@render children?.()}
</div>
