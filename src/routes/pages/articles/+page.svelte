<script>
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";
</script>

<svelte:head>
    <title>Articles</title>
    <link href="/styles/elements/Tip.css" rel="stylesheet" />
    <script src="/scripts/elements/TipElement.js"></script>
</svelte:head>

<article>
    <section>
        <h2>Articles</h2>
        <p>Articles I have written.</p>
        <ul>
            <li>
                <a href="/pages/articles/unity-decompiling.html"
                    >Unity Decompiling</a
                >
            </li>
            <li>
                <a href="/pages/articles/harmony-patching.html"
                    >Harmony Patching</a
                >
            </li>
            <li><a href="/pages/articles/php-pdo.html">PHP PDO</a></li>
        </ul>
    </section>

    <section>
        <h2>Older Projects</h2>
        <p>Projects from earlier years.</p>
        <WarningTip>
            Since many of these pages were made before I settled on standards
            and format, their quality may vary. I <strong
                >do not guarantee their quality</strong
            >.
        </WarningTip>
        <ul>
            <li>
                <a href="/pages/games/avoid-survival.html">Avoid Survival</a>
            </li>
            <li>
                <a href="/pages/games/obstacle-racer.html">Obstacle Racer</a>
            </li>
            <li>
                <a href="/pages/others/panel-de-pon-ai.html"
                    >Panel de Pon - AI</a
                >
            </li>
            <li><a href="/pages/games/boulder-dash.html">Boulder Dash</a></li>
            <li>
                <a href="/pages/games/btd6-boss-mods.html">BTD6 Boss Mods</a>
            </li>
            <li>
                <a href="/pages/others/grocery-app-mobile-1.html">Grocery App</a
                >
            </li>
            <li><a href="/pages/others/pokemon-bot.html">Pokémon Bot</a></li>
            <li>
                <a href="/pages/games/snake-procedural.html">Procedural Snake</a
                >
            </li>
            <li><a href="/pages/others/sql-manager.html">SQL Manager</a></li>
            <li><a href="/pages/games/zelda-project.html">Zelda Project</a></li>
        </ul>
    </section>
</article>
