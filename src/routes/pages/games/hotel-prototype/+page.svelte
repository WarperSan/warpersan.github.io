<script>
    import { asset, resolve } from "$app/paths";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";
    import WebGLPlayer from "$lib/components/WebGLPlayer.svelte";

</script>
<svelte:head>
    <title>Hotel - Prototype</title>
    <link rel="icon" type="image/x-icon" href="" />
    <meta name="title" content="Hotel - Prototype" />
    <meta
        name="description"
        content="A horror game built in 10 days as a self-imposed game jam challenge. Walk through 25 eerie rooms filled with suspense and mystery."
    />
    <meta name="author" content="WarperSan" />
    <meta
        name="keywords"
        content="Hotel Game, Horror Prototype, Indie Horror, Game Jam, WebGL Horror Game, itch.io horror, short horror game"
    />
</svelte:head>

<article>
    <section>
        <h1>Hotel</h1>
        <p>
            This project was made as a self-imposed game jam. In 10 days, I
            needed to make a horror game from scratch.
        </p>
        <p>
            The player will walk through 25 rooms, encountering various events.
        </p>
    </section>
    <section>
        <h2>Controls</h2>
        <ul>
            <li>WASD to move</li>
            <li>Mouse to look around</li>
            <li>Left click to interact</li>
        </ul>
    </section>
    <section>
        <div style="display: flex; justify-content: center;">
            <WebGLPlayer pc src={asset("/assets/builds/Hotel-Prototype/index.html")}/>
        </div>
        <WarningTip>This game is compatible on PC.</WarningTip>
        <p>
            If you want to download the game or support it, you can find it <a
                href="https://warpersan.itch.io/one-shot"
                >here</a
            >.
        </p>
    </section>
</article>
