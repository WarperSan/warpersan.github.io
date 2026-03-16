<script>
    import { assets } from "$app/paths";

</script>
<svelte:head>
    <link href="{assets}/styles/projects.css" rel="stylesheet" />
    <script src="{assets}/scripts/elements/ControlElement.js"></script>
</svelte:head>

<article>
    <section>
        <h2 id="featured-projects">Projects</h2>
        <p>
            This is a list of the featured projects that I did. If you want more
            information on the projects I did, you can check <a
                href="https://warpersan-blog.onrender.com/"
                target="_blank">this</a
            >.
        </p>
        <div id="projects-container">
            <div class="projects">
                <h3>Obstacle Racer</h3>
                <div>
                    <span>
                        This game is the result of a self-hosted game jam. In
                        one week, I was able to make a small arcade game similar
                        to <i>Ultimate Chicken Horse</i>.<br /><br />Although
                        this game is very simple and unbalanced, it is still a
                        blast to play with friends. This project required me to
                        manage my time efficiently, draw art without
                        overdesigning, create modular parts to easily add new
                        stuff and manage networking for multiplayer.
                    </span>
                </div>
                <hr />
                <div class="projects-controls">
                    <project-control
                        type="play"
                        href="https://warpersan.itch.io/obstacle-racer"
                    ></project-control>
                </div>
            </div>
            <div class="projects">
                <h3>Shadow Spire</h3>
                <div>
                    <span>
                        For my game developement class, me and my friend
                        achieved to make a retro dungeon crawler. Throughout its
                        making, we had to solve multiple problems we never faced
                        before: path finding, room generation, enemy and weapon
                        design.<br /><br />By the end, we had a working game
                        with several weapons, multiple enemies, a progressive
                        room generation and a
                        <i>Undertale</i>-like fight system. This project taught
                        us how to design a world to make it interesting yet
                        challenging.
                    </span>
                </div>
                <hr />
                <div class="projects-controls">
                    <project-control
                        type="code"
                        href="https://github.com/WarperSan/Shadow-Spire"
                    ></project-control>
                </div>
            </div>
            <div class="projects">
                <h3>Bingo API</h3>
                <div>
                    <span>
                        This library allows any mod to add a seamless
                        integration of <a href="https://bingosync.com"
                            >BingoSync</a
                        >
                        to the game. This has the advantages of not requiring
                        any browser or user input. You can create a room with
                        given objectives, connect to it, change team and mark
                        goals.<br /><br />Although this is very powerful and
                        easy to use, by itself, the library does nothing. You
                        can take a look on how to use it from
                        <a href="https://github.com/WarperSan/LethalBingo"
                            >this project</a
                        >, which implements part of the library.
                    </span>
                </div>
                <hr />
                <div class="projects-controls">
                    <project-control
                        type="code"
                        href="https://github.com/WarperSan/BingoAPI"
                    ></project-control>
                </div>
            </div>
        </div>
    </section>
</article>
