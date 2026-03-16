<svelte:head>
    <title>Procedural Snake</title>
    <link rel="icon" href="" type="image/x-icon" />
    <meta name="title" content="Procedural Snake" />
    <meta
        name="description"
        content="A custom Snake game with procedurally generated walls, built for fun during early college. Includes perlin-style noise generation, wall filtering, and reachability analysis."
    />
    <meta name="author" content="WarperSan" />
    <meta
        name="keywords"
        content="Snake Game, Procedural Generation, Perlin Noise, Game Development, JavaScript, Pathfinding, Wall Generation, WarperSan"
    />
</svelte:head>

<article>
    <section>
        <h2>Story</h2>
        <p>
            In my first semester, the projects they gave us didn't really
            entertain me
            <i>due to my prior experience in coding</i>. Since I was bored, I
            made a Snake game, but with wall generation. The game now has walls
            that are procedurally generated.
        </p>

        <p>
            Is it fun? Kinda. It's harder, for sure. However, I didn't finish
            the project so the player can just spawn in a wall if the randomness
            feels like it.
            <br /><br />
            The idea of this came from when I took classes before school. We made
            a copy of snake, and I was wondering whether it was possible to create
            a procedurally generated snake with walls. You can find the source code
            <a
                href="https://github.com/WarperSanPlus/Snake-Procedural"
                text="Source Code">here</a
            >.
        </p>

        <img
            src="/assets/images/pages/snake-procedural/demo.png"
            title="Demonstration of the program"
        />
        <video src="https://www.youtube.com/embed/_z5ziI1enio"></video>
    </section>
    <section>
        <h2>Development</h2>
        <h3>Wall Generation</h3>
        <p>
            To make it, there are two major challenges: creating and drawing all
            the walls. Strangely enough, drawing the walls is the easiest part.
            The problem with the walls is to draw them efficiently. I remember
            trying to draw 200 walls and the game run at 5 frames per second.
        </p>
    </section>
    <section>
        <h4>Noise Map</h4>
        <p>
            For the walls, you need to create a perlin noise map. In order to
            make it, you will need to create a noise map.
            <br /><br />
            To create a noise map, I used averages
            <i>there is probably a real name for it, but meh</i>. First thing,
            you generate the first cell with a random number between 0 and 1.
            This can be achieved by calling Math.random() in JavaScript.
            <br />
            Afterward, each cell will add a random value to the previous cell and
            clamp the value. In my case, I added a random value between [-0.25 ;
            0.25]. This is how I achieved to get data like this:
        </p>

        <img
            src="/assets/images/pages/snake-procedural/noise_map.png"
            title="Noise Map"
        />
    </section>
    <section>
        <h4>Blurry Noise Map</h4>
        <p>
            Once you have it, I blurred it in order to give smoother walls
            <i>this is probably not the best way to do it, but meh</i>.
            Otherwise, you can get a lot of empty spaces. To do this, you just
            need to take the average of the four neighbors of the cell.
            <br />
            It's important to note that I outputted the result in a different array.
            If you output your result in the original array, the map will tend to
            become one shade.
        </p>

        <img
            src="/assets/images/pages/snake-procedural/blurry_noise_map.png"
            title="Blurry Noise Map"
        />
    </section>
    <section>
        <h4>Wall Creation</h4>
        <p>
            Once your noise is created, you select which pixel should be a wall.
            This is determined by the "Tolerance" slider. You simply define the
            walls as all the cells with a value bigger than the limit.
            <br />
            I also added a check to see if the cell's neighbors are also walls. I'm
            not sure what this does, but I assume this removes lots of small "islands"
            of walls.
        </p>
    </section>
    <section>
        <h4>Area Selection</h4>
        <p>
            Once you have walls, you only need to remove the areas unreachable
            by the player. To choose which areas to remove, you calculate how
            much tiles the area covers and the one with the highest will be
            kept. Since you need to travel every tile, I doubt there is a faster
            way than travelling everything. In this video, I show how the game
            calculates the number of tiles. Note that this is slowed down for
            the demonstration. In reality, the game only needs a couple of
            milliseconds to execute this.
        </p>

        <iframe src="https://www.youtube.com/embed/PAhB0KxQ3i0"></iframe>
    </section>
    <section>
        <h3>Conclusion</h3>
        <p>
            After removing the unreachable areas, the game is ready! The player
            is spawned at the same position, even if there is a wall. This is
            the reason why I stopped to work on this. It is really hard to find
            the best position to spawn the player in when the walls are
            completely random. Even the food can spawn in an unreachable spot <i
                >where the player can't exit without dying</i
            >.
        </p>
    </section>
</article>
