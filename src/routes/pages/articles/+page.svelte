<script>
    import { asset, resolve } from "$app/paths";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";

</script>
<svelte:head>
    <title>Articles</title>
</svelte:head>

<article>
    <section>
        <h2>Articles</h2>
        <p>Articles I have written.</p>
        <ul>
            <li>
                <a href={resolve("/pages/articles/unity-decompiling")}>Unity Decompiling</a
                >
            </li>
            <li>
                <a href={resolve("/pages/articles/harmony-patching")}>Harmony Patching</a>
            </li>
            <li><a href={resolve("/pages/articles/unity-best-practices")}>Unity Best Practices</a></li>
            <li><a href={resolve("/pages/articles/php-pdo")}>PHP PDO</a></li>
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
                <a href={resolve("/pages/games/avoid-survival")}>Avoid Survival</a>
            </li>
            <li>
                <a href={resolve("/pages/games/obstacle-racer")}>Obstacle Racer</a>
            </li>
            <li>
                <a href={resolve("/pages/others/panel-de-pon-ai")}>Panel de Pon - AI</a>
            </li>
            <li><a href={resolve("/pages/games/boulder-dash")}>Boulder Dash</a></li>
            <li>
                <a href={resolve("/pages/games/btd6-boss-mods")}>BTD6 Boss Mods</a>
            </li>
            <li>
                <a href={resolve("/pages/others/grocery-app-mobile-1")}>Grocery App</a>
            </li>
            <li><a href={resolve("/pages/others/pokemon-bot")}>Pokémon Bot</a></li>
            <li>
                <a href={resolve("/pages/games/snake-procedural")}>Procedural Snake</a>
            </li>
            <li><a href={resolve("/pages/others/sql-manager")}>SQL Manager</a></li>
            <li><a href={resolve("/pages/games/zelda-project")}>Zelda Project</a></li>
        </ul>
    </section>
</article>
