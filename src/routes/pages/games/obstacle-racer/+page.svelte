<script>
    import { asset } from "\$app/paths";

</script>
<svelte:head>
    <title>Obstacle Racer</title>
    <link
        rel="icon"
        href={asset("/assets/images/pages/obstacle-racer/icon.png")}
        type="image/x-icon"
    />
    <meta name="title" content="Obstacle Racer" />
    <meta
        name="description"
        content="Obstacle Racer is a multiplayer platformer developed in a one-week game jam, where players race to the goal and strategically place obstacles to hinder others."
    />
    <meta name="author" content="WarperSan" />
    <meta
        name="keywords"
        content="Obstacle Racer, Multiplayer Game, Unity Game, Game Jam, Platformer, Indie Game, WarperSan, Mono, Obstacle Course Game"
    />
</svelte:head>

<article>
    <section>
        <h1>Story</h1>
        <p>
            Around June 20th 2023, I decided to make a Gamejam that lasted one
            week. I successfully made and released a game that I called
            "Obstacle Racer". The goal of the game is really simple yet
            effective: <strong>be the first to reach the goal</strong>. If you
            want to try the game, you can find its page
            <a
                href="https://warpersan.itch.io/obstacle-racer"
                text="Source Code"
                target="_blank">here</a
            >. I didn't find any video of mine showcasing the game other than
            this one. In this version, the only things missing are the end flag
            and the final version of the obstacle selector:
        </p>

        <iframe src="https://www.youtube.com/embed/1Ktbbt8SmvM"></iframe>
    </section>
    <section>
        <h1>Goal</h1>
        <p>
            Once every player reached the goal <side-note
                >or the 60 seconds timer has ended</side-note
            >, the player who arrived first can place one of obstacles offered.
            Its goal is to place the obstacle where it will block other players
            without blocking themselves. As the game progresses, it gets harder
            to reach the end. Sadly, I didn't have time to implement a bomb in
            order to destroy other obstacles.
        </p>
    </section>
    <section>
        <h1>Color Theory</h1>
        <p>
            Something interesting with this project is how I converted a
            weakness into a strength. Since I can't draw, I decided to use a
            simple monochrome art style. However, this allowed me to use colors
            in an interesting way: <strong
                >player identification and power</strong
            >. Since all players share the same sprite, I needed a way to
            differentiate the different players. I came up with a simple detail
            on the player's sprite, the flower. Each player has a flower on
            their head that changes color depending on the player. It was really
            easy to change the colors used and the flower contrasts a lot with
            the simple black-white art style:
        </p>

        <img
            src={asset("/assets/images/pages/obstacle-racer/player-spritesheet.png")}
            title="Player spritesheet"
        />

        <p>
            Although colors were used to identify players, I also attributed
            colors to power. Originally, the player who won was supposed to
            "ascend":
        </p>

        <img
            src={asset("/assets/images/pages/obstacle-racer/player-ascension.png")}
            title="Player ascension"
        />
    </section>
    <section>
        <h1>Accomplishments</h1>
        <p>
            This project allowed me to learn how multiplayer works and to become
            more familiar with Unity. It also gave me an OC that I named "Mono" <side-note
                >short for monochrome</side-note
            >.
        </p>

        <img
            src={asset("/assets/images/pages/obstacle-racer/mono.png")}
            title="Mono <3"
        />
    </section>
</article>
