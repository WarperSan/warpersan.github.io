<script>
    import { resolve } from "$app/paths";
    import ArticleItem from "$lib/components/Items/ArticleItem.svelte";
    import OldArticleItem from "$lib/components/Items/OldArticleItem.svelte";
    import { Temporal } from "@js-temporal/polyfill";
</script>

<svelte:head>
    <title>Articles</title>
</svelte:head>

<article>
    <section>
        <h1>Articles</h1>
        <p class="text-[var(--text-secondary)]">
            A collection of technical articles I have written.
        </p>

        <div class="article-list">
            <ArticleItem
                href={resolve("/pages/articles/unity-decompiling")}
                title="Unity Decompiling"
                description="How to inspect and reverse-engineer compiled Unity assemblies."
                tag="Unity"
                readTime={Temporal.Duration.from({ minutes: 3 })}
            />
            <hr />
            <ArticleItem
                href={resolve("/pages/articles/harmony-patching")}
                title="Harmony Patching"
                description="Patching methods at runtime with Harmony."
                tag="C# / Modding"
                readTime={Temporal.Duration.from({ minutes: 8 })}
            />
            <hr />
            <ArticleItem
                href={resolve("/pages/articles/unity-best-practices")}
                title="Unity Best Practices"
                description="Patterns and conventions that keep Unity projects maintainable as they grow."
                tag="Unity"
                readTime={Temporal.Duration.from({ minutes: 6 })}
            />
            <hr />
            <ArticleItem
                href={resolve("/pages/articles/php-pdo")}
                title="PHP PDO"
                description="Adding an extra layer on top of PHP's PDO."
                tag="PHP"
                readTime={Temporal.Duration.from({ minutes: 5 })}
            />
        </div>
    </section>

    <section>
        <h3>Older work</h3>
        <p class="text-[var(--text-secondary)]">
            Written before I settled on a consistent format. Quality may vary.
        </p>
        <div
            class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2 m-0 p-0"
        >
            <OldArticleItem
                href={resolve("/pages/games/avoid-survival")}
                title="Avoid Survival"
                tag="Game"
            />
            <OldArticleItem
                href={resolve("/pages/games/obstacle-racer")}
                title="Obstacle Racer"
                tag="Game"
            />
            <OldArticleItem
                href={resolve("/pages/others/panel-de-pon-ai")}
                title="Panel de Pon — AI"
                tag="AI"
            />
            <OldArticleItem
                href={resolve("/pages/games/boulder-dash")}
                title="Boulder Dash"
                tag="Game"
            />
            <OldArticleItem
                href={resolve("/pages/games/btd6-boss-mods")}
                title="BTD6 Boss Mods"
                tag="Modding"
            />
            <OldArticleItem
                href={resolve("/pages/others/grocery-app-mobile-1")}
                title="Grocery App"
                tag="Mobile"
            />
            <OldArticleItem
                href={resolve("/pages/others/pokemon-bot")}
                title="Pokémon Bot"
                tag="Bot"
            />
            <OldArticleItem
                href={resolve("/pages/games/snake-procedural")}
                title="Procedural Snake"
                tag="Game"
            />
            <OldArticleItem
                href={resolve("/pages/others/sql-manager")}
                title="SQL Manager"
                tag="Tool"
            />
            <OldArticleItem
                href={resolve("/pages/games/zelda-project")}
                title="Zelda Project"
                tag="Game"
            />
        </div>
    </section>
</article>

<style>
    .article-list {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--border-container);
        border-left: none;
        border-right: none;
    }

    .article-list > hr {
        margin: 0;
        border-top: 1px solid var(--border-container);
    }
</style>
