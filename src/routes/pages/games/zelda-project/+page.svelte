<script>
    import { assets } from "$app/paths";

</script>
<svelte:head>
    <title>Zelda Project</title>
    <link rel="icon" href="" type="image/x-icon" />
    <meta name="title" content="Zelda Project" />
    <meta
        name="description"
        content="A school project inspired by Zelda. Features include a custom animation system using XML, simple cutscenes with async tasks, UI tools, and customizable controls."
    />
    <meta name="author" content="WarperSan" />
    <meta
        name="keywords"
        content="Zelda Project, WarperSan, School Project, Game Development, C#, Animation System, Custom Controls, XML Animation, Async Cutscenes, UI System"
    />
</svelte:head>

<article>
    <section>
        <h2>Story</h2>
        <p>
            As the final project for my second semester, we had make something
            that resembles Zelda.
            <i>spoiler alert, the map is the only thing related</i>. Overall,
            the project isn't crazy. You create monsters, they move and you
            fight. You can find the source code
            <a
                href="https://github.com/WarperSan/Zelda-Project"
                text="Source Code">here</a
            >.
        </p>
    </section>
    <section>
        <h2>Development</h2>
        <h3>Animations via XML file</h3>
        <p>
            Since I was stubborn, I remade the entire animation system. The only
            they gave us consisted of simply scrolling through a spritesheet
            where the column is the frame number and the row is the different
            angles.
        </p>

        <img
            src="{assets}/assets/images/pages/zelda-project/skel.png"
            title="Skeleton spritesheet"
        />

        <p>
            At the time, I worked a lot for FNF mods and they used a method
            where you create the animations out of a XML file. The file simply
            tells the game where each frame is. Sadly, my implementation is
            slower than the previous out
            <i>from 2883 ticks to 3530</i>. It isn't much, but it still is
            faster. However, my solution is probably more flexible than theirs.
        </p>
    </section>
    <section>
        <h3>Simple UI</h3>
        <p>
            I also made an entire UI system that allows me to quickly create
            UIs.
        </p>

        <img
            src="{assets}/assets/images/pages/zelda-project/debug_ui.png"
            title="Debug UI"
        />
    </section>
    <section>
        <h3>Simple Cutscene</h3>
        <p>
            This project also allowed me to discover about async tasks. With
            them, I was able to create a cutscene manager that allows to create
            simple cutscene.
        </p>
    </section>
    <section>
        <h3>Customizable controls</h3>
        <p>
            This is something that the teacher really didn't ask for. I just
            felt like doing it. Therefore, I made a system that allows me to
            load the controls of the player via a file. This complexifies the
            code, but allows a new dimension of customizability to the game.
        </p>

        <img
            src="{assets}/assets/images/pages/zelda-project/controls_file.png"
            title="Controls file"
        />
    </section>
    <section>
        <h2>Showcase</h2>
        <p>
            If you want to see the game in action, here is a video showcasing
            it:
        </p>

        <iframe src="https://www.youtube.com/embed/TDvctfH6ALQ"></iframe>
    </section>
</article>
