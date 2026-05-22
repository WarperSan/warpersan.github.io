<script>
    import { asset } from "$app/paths";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";
    import WebGLPlayer from "$lib/components/WebGLPlayer.svelte";

</script>
<svelte:head>
    <title>FiddleSticks' Maze</title>
    <link
        rel="icon"
        type="image/x-icon"
        href="https://preview.redd.it/fiddlesticks-icon-on-pbe-other-than-chibi-v0-b3pu39v0vbib1.png?auto=webp&s=04e2a542dbb7ad07cd882e77f5dd1100e2a15065"
    />
    <meta name="title" content="FiddleSticks' Maze" />
    <meta
        name="description"
        content="Explore a randomly generated maze and defeat the lurking boss in FiddleSticks' Maze. Built using WebGL and powered by behavior trees."
    />
    <meta name="author" content="WarperSan and HJETT" />
    <meta
        name="keywords"
        content="FiddleSticks Maze, WebGL Game, Indie Game, AI Behavior Trees, Random Maze Game, itch.io game, horror game"
    />
</svelte:head>

<article>
    <section>
        <h1>FiddleSticks' Maze</h1>
        <p>
            This project was made as a project for school. The player needs to
            find three tombstones that, once interacted with, will defeat the
            boss.
        </p>
        <p>
            The boss lurks the player, trying to defeat the player without being
            seen. All enemies are powered by behaviour trees. The maze is
            randomly generated.
        </p>
        <p>
            Everything was made by me and my <a
                href="https://github.com/HJETT"
                target="_blank">colleague</a
            >. Although it was a teamwork, I mostly handled the technical
            structure of the project while he handled the creative aspect of the
            project.
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
            <WebGLPlayer pc src={asset("/assets/builds/FiddleStick-Maze/index.html")} />
        </div>
        <WarningTip>This game is compatible on PC.</WarningTip>
        <p>
            If you want to download the game or support it, you can find it <a
                href="https://warpersan.itch.io/fiddlesticks-maze"
                >here</a
            >.
        </p>
    </section>
</article>
