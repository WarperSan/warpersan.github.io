<script>
    import { asset } from "\$app/paths";

</script>
<svelte:head>
    <title>Avoid Survival</title>
    <link rel="icon" href="" type="image/x-icon" />
    <meta name="title" content="Avoid Survival" />
    <meta
        name="description"
        content="Avoid Survival is a chaotic solo-developed game focused purely on survival. A passion project full of quirks, bugs, and creative freedom."
    />
    <meta name="author" content="WarperSan" />
    <meta
        name="keywords"
        content="Avoid Survival, Indie Game, Solo Game Dev, itch.io game, Survival Game, Pixel Art, Experimental Game, Game Dev Story"
    />
</svelte:head>

<article>
    <section>
        <h1>Story</h1>
        <p>
            This was the first game that I made that I just shut my brain off.
            This wasn't my first game (<i>probably my second or my third</i>),
            but it's the one I had the most fun with. The concept was simple:
            <strong>survive</strong>. No fancy goal. Just plain old survival.
            The game isn't the best made, but I had a lot of fun making it. As a
            solo game developer, the hardest part is, at least for me, the art (<i
                >At the time, I didn't touch music</i
            >). I suck at it, and it makes my projects look bad. However, for
            this project, my brain just shut this switch. I didn't care about
            the quality of my sprites, I was going to make a game. This created
            some interesting sprites, but for a non-artist, I was and still
            proud of them.
        </p>

        <div
            style="display: flex;justify-content: center;align-items: baseline;"
        >
            <img src={asset("/assets/images/pages/avoid-survival/outside_worm.png")} />
            <img src={asset("/assets/images/pages/avoid-survival/spikes-item.png")} />
        </div>
    </section>

    <section>
        <h1>Conclusion</h1>
        <p>
            Should you play it? <strong>Of course (not)!</strong> It is not the game
            of the year, and it will never be. But, if you want to experience something,
            go ahead! It is a game after all. Buggy? Yeah, but still playable and
            hopefully enjoyable. I don't quite remember how long it took to make
            it. If I had to guess, probably around 2-3 weeks. Something important
            I realised after this project is that you should make things that you
            are passionate about, not what makes the most money. I love making this
            stupid game and I don't regret making it.
        </p>

        <p>
            If you would like to play, you can find the latest version
            <a href="https://warpersan.itch.io/avoid-survival" target="_blank"
                >here</a
            >. You can also find all the builds that I've made over the
            development of the game
            <a
                href="https://drive.google.com/drive/folders/1lj4ShF4JSLJy6fiESYbvs1HwRj0IPwZZ?usp=sharing"
                target="_blank"
            >
                here
            </a>.
        </p>
    </section>

    <section>
        <h1>Gallery</h1>
        <img
            src={asset("/assets/images/pages/avoid-survival/awful-scripts.png")}
            title="My awful organisation for the scripts"
            style="width: 100%;"
        />
        <img
            src={asset("/assets/images/pages/avoid-survival/banner.png")}
            title="Image showing the game"
            style="width: 100%;"
        />
    </section>
</article>
