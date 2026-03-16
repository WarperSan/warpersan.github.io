<script>
    import { assets, base } from "$app/paths";

</script>
<svelte:head>
    <title>Tools</title>
    <link href="{assets}/styles/pages/tools.css" rel="stylesheet" />
    <script src="{assets}/scripts/elements/ToolCardElement.js"></script>
</svelte:head>

<article>
    <section>
        <h2>Online Tools</h2>
        <p>
            A collection of online tools developed by me for a variety of tasks.
        </p>
        <div id="tools-container" style="background-color: var(--bg);">
            <tool-card
                title="JSON Compare"
                description="A editor for comparing two JSON data."
                icon="fa-solid fa-code-compare"
                href="{base}/pages/tools/json-compare"
            ></tool-card>
            <tool-card
                title="DDS Converter"
                description="A converter to parse DDS images into PNG."
                icon="fa-solid fa-arrow-right-arrow-left"
                href="{base}/pages/tools/dds-convert"
            ></tool-card>
        </div>
    </section>
</article>
