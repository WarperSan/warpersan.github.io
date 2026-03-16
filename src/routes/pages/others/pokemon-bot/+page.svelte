<svelte:head>
    <title>Pokémon Bot</title>
    <link rel="icon" href="" type="image/x-icon" />
    <meta name="title" content="Pokémon Bot" />
    <meta
        name="description"
        content="A bot that attempts to play Pokémon HeartGold by reading memory values, interpreting map data, and using pathfinding. Built with Lua and C#."
    />
    <meta name="author" content="WarperSan" />
    <meta
        name="keywords"
        content="Pokémon Bot, HeartGold AI, ROM Hacking, Lua, C#, Game Automation, Memory Analysis, Pathfinding, Game Scripting, WarperSan"
    />
</svelte:head>

<article>
    <section>
        <h2>Story</h2>
        <p>
            This project is pretty odd in comparison to the rest. I love Pokémon
            and I can code, so I thought of making a Pokémon Bot that would play
            the entirety of Pokémon HeartGold for me. I liked this project,
            since I had to examine hexadecimal values <i
                >primarily from memory</i
            >
            and determine what address represented what attribute of the game.
        </p>
    </section>
    <section>
        <h2>Road block</h2>
        <p>
            My researches were a success, but I faced an enormous wall: game
            progression. Since most Pokémon games aren't a battle simulator, you
            can't just walk forward and beat the game. You must travel a complex
            map in order to beat the game. Sadly, it is not as easy as getting
            the end position and letting the computer pathfinding to it. There
            are a lot of cutscenes that opens paths that you couldn't walk
            through before. For a human, it's pretty easy to figure out. For a
            bot, it is hard. Very hard. Since I was lazy and didn't want to
            place every marker in order to complete the game, I had to search
            through the game's scripts to find which flag blocks my path and
            switch scripts set the flag to the correct value. Of course, it is
            easier said than done. In the first town only, I searched a long
            time to find where the flag gets set to the correct value. Sadly,
            after that, I wasn't feeling like continuing the project and left it
            to rot.
        </p>
    </section>
    <section>
        <h2>How does it work?</h2>
        <h3>Obtaining map data</h3>
        <p>
            To make it, I used a combination of Lua and C#
            <i>if I had to remake it, I would probably do Lua &amp; C++</i>. I
            decompiled the ROM using
            <a
                href="https://projectpokemon.org/home/files/file/4421-ds-pokemon-rom-editor"
                >DSPRE</a
            >. Afterward, I looked how the game manages the map and could find
            and decode the collisions. This is where the project truly starts.
        </p>
    </section>
    <section>
        <h3>Pathfinding</h3>
        <p>
            Then, I applied a pathfinding algorithm to determines the shortest
            path. In order to make the bot smarter, I made it so that it avoids
            grass as much as possible. My plan for the bot wasn't to have one
            bot doing all the hard lifting. I would have separated the work into
            two bots:
        </p>
        <ul>
            <li>One for the map</li>
            <li>One for the battles</li>
        </ul>

        <p>This allows to write/maintain the code much easily.</p>
    </section>
    <section>
        <h2>Sudden End</h2>
        <p>
            To finish, before scrapping the project, I did a small "speedrun"
            with the bot. Here, you can see the "run" where I tasked the bot to
            move from the starter bed to the rival's bed
            <side-note>were the "Creep%" name comes from</side-note>. You can
            see the inputs in the small window. Also, yes, I changed the weather
            in the player's living room. Reason: because.

            <br /><br />
            You can find the source code
            <a
                href="https://github.com/WarperSan/Pokemon-Bot"
                text="Source Code">here</a
            >, if you want to see.
        </p>

        <iframe src="https://www.youtube.com/embed/FrP4vGXR9pc"></iframe>
    </section>
</article>
