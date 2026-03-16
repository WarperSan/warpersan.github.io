<svelte:head>
    <title>Tools</title>
    <link href="/styles/pages/tools.css" rel="stylesheet" />
    <script src="/scripts/elements/ToolCardElement.js"></script>
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
                href="/pages/tools/json-compare"
            ></tool-card>
            <tool-card
                title="DDS Converter"
                description="A converter to parse DDS images into PNG."
                icon="fa-solid fa-arrow-right-arrow-left"
                href="/pages/tools/dds-convert"
            ></tool-card>
        </div>
    </section>
</article>
