<script>
    import { assets } from "$app/paths";

</script>
<svelte:head>
    <link href="{assets}/styles/pages/dds-convert/file-items.css" rel="stylesheet" />
    <script src="{assets}/scripts/pages/dds-convert/BinaryReader.js"></script>
    <script src="{assets}/scripts/pages/dds-convert/Converter.js"></script>
    <script src="{assets}/scripts/pages/dds-convert/FileItem.js"></script>
    <script src="{assets}/scripts/pages/dds-convert/script.js"></script>

    <title>DDS Converter</title>
    <link rel="icon" href="" type="image/x-icon" />
</svelte:head>

<article class="full">
    <canvas id="canvas" style="display: none;"></canvas>

    <div style="display: flex;flex-direction: column;width: 100%;height: 100%;">
        <input type="file" id="file-input" accept=".dds,.DDS" multiple />
        <div id="file-items"></div>
    </div>
</article>
