<script>
    import { asset } from "$app/paths";
    import WebGLPlayer from "$lib/components/WebGLPlayer.svelte";

</script>
<svelte:head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Space Shooter - Prototype</title>
    <link
        rel="icon"
        type="image/x-icon"
        href="https://cdn2.steamgriddb.com/icon/5e992b263956d65cf3a3f3161ff7b272.ico"
    />
    <meta name="title" content="Space Shooter - Prototype" />
    <meta
        name="description"
        content="A school project inspired by Touhou, featuring modular wave-based enemy patterns and a boss fight. Built for flexibility and fun."
    />
    <meta name="author" content="WarperSan and HJETT" />
    <meta
        name="keywords"
        content="Space Shooter, Touhou Clone, Bullet Hell Game, Indie Prototype, WebGL Game, itch.io shooter, game dev school project"
    />
</svelte:head>

<article>
    <section>
        <h1>Space Shooter</h1>
        <p>
            This project was made as a project for school. Along with a <a
                href="https://github.com/HJETT"
                target="_blank">colleague</a
            >, we created a clone of <i>Touhou</i>.
        </p>
        <p>
            The game randomly picks a wave from the built-in waves. There is
            also a boss fight.
        </p>
        <p>
            This project is built on modular systems, allowing to create new
            enemies and new projectiles without having to heavily modify the
            systems. You can take a look at the source code <a
                href="https://github.com/WarperSanPlus/TP3-SpaceShooter"
                target="_blank">here</a
            >.
        </p>
    </section>
    <section>
        <h2>Controls</h2>
        <ul>
            <li>WASD to move</li>
            <li>Left click or Space to shoot</li>
            <li>Shift to move slower</li>
        </ul>
    </section>
    <section>
        <div style="display: flex; justify-content: center;">
            <WebGLPlayer
                pc
                mobile
                src={asset("/assets/builds/SpaceShooter-Prototype/index.html")}
            />
        </div>
        <p>
            If you want to download the game or support it, you can find it <a
                href="https://warpersan.itch.io/touhou-from-wish"
                >here</a
            >.
        </p>
    </section>
</article>
