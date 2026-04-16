<script>
    import { asset, resolve } from "$app/paths";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";
    import WebGLPlayer from "$lib/components/WebGLPlayer.svelte";
</script>

<svelte:head>
    <title>Game of Danger - Prototype</title>
    <link rel="icon" type="image/x-icon" href="" />
    <meta name="title" content="Game of Danger - Prototype" />
    <meta
        name="description"
        content="A creative 2D and 3D puzzle game prototype challenging players to think outside the box. Built as a personal experiment with unique mechanics."
    />
    <meta name="author" content="WarperSan" />
    <meta
        name="keywords"
        content="Game of Danger, Puzzle Game, WebGL Prototype, 3D Puzzle, 2D Puzzle, Indie Game, itch.io game, browser game"
    />
</svelte:head>

<article>
    <section>
        <h1>Game of Danger</h1>
        <p>
            This project was made as a challenge to myself. I had an idea of a
            gimmick and tried to make a small prototype about it. The player
            needs to complete the puzzles of the first world.
        </p>
        <p>
            This game tries to make the player think outside the box. With both
            3D and 2D, the puzzles can use that new dimension to explore and
            create interesting puzzles.
        </p>
    </section>
    <section>
        <h2>Controls</h2>
        <ul>
            <li>WASD to move</li>
            <li>Mouse to look around</li>
            <li>Left click to interact</li>
            <li>More controls in the game itself</li>
        </ul>
    </section>
    <section>
        <div style="display: flex; justify-content: center;">
            <WebGLPlayer
                pc
                src={asset("/assets/builds/GameOfDanger-Prototype/index.html")}
            />
        </div>
        <WarningTip>This game is compatible on PC.</WarningTip>
        <p>
            If you want to download the game or support it, you can find it <a
                href="https://warpersan.itch.io/game-of-danger"
                >here <i class="fa-solid fa-download"></i></a
            >.
        </p>
    </section>
</article>
