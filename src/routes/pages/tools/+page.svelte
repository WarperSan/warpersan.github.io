<script>
    import { asset, resolve } from "$app/paths";
    import ToolItem from "$lib/components/Items/ToolItem.svelte";
</script>

<svelte:head>
    <title>Tools</title>
</svelte:head>

<article>
    <section>
        <h1>Online Tools</h1>
        <p>
            A collection of online tools developed by me for a variety of tasks.
        </p>
        <div
            class="flex flex-col gap-4 p-4 bg-[var(--background-input)] border-2 border-[var(--border-input)]"
        >
            <ToolItem
                title="JSON Compare"
                description="A editor for comparing two JSON data."
                icon="fa-solid fa-code-compare"
                href={resolve("/pages/tools/json-compare")}
            />
            <ToolItem
                title="DDS Converter"
                description="A converter to parse DDS images into PNG."
                icon="fa-solid fa-arrow-right-arrow-left"
                href={resolve("/pages/tools/dds-convert")}
            />
        </div>
    </section>
</article>
