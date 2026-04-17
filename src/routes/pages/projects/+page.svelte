<script>
    import { asset, resolve } from "$app/paths";
    import ProjectItem from "$lib/components/Items/ProjectItem.svelte";

</script>
<svelte:head>
    <title>Projects</title>
</svelte:head>

<article>
    <section>
        <h2>Projects</h2>
        <p>
            A collection of projects I have made over the years. This includes
            games, mods, tools, interactive experiences.
        </p>
        <div id="projects-container" class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[1fr] gap-4 p-4 bg-[var(--background-input)] border-2 border-[var(--border-input)]">
            <ProjectItem
                title="ThunderPipe"
                description="A CLI tool for validating and publishing packages to Thunderstore."
                href="https://github.com/WarperSan/ThunderPipe"
                cover="https://raw.githubusercontent.com/WarperSan/ThunderPipe/refs/heads/master/icon.png"
            />
            <ProjectItem
                title="FiddleStick's Maze"
                description="Escape FiddleStick's realm before he catches you."
                href={resolve("/pages/games/fiddlesticks-maze")}
                cover="https://img.itch.zone/aW1nLzE5MjcwNzMxLnBuZw==/original/6oe9o6.png"
            />
            <ProjectItem
                title="Game of Danger"
                description="Solve the Problems by using &quot;Out-of-the-box&quot; solutions."
                href={resolve("/pages/games/game-of-danger-prototype")}
                cover="https://img.itch.zone/aW1hZ2UvMjM1NjcxOC8xMzk2MDQ4MC5wbmc=/original/VcmHOH.png"
            />
            <ProjectItem
                title="Hotel"
                description="Find the source of the Haunting."
                href={resolve("/pages/games/hotel-prototype")}
                cover="https://img.itch.zone/aW1hZ2UvMTkyMTcyMi8xMzk2MDY4Ny5wbmc=/original/HTFeXZ.png"
            />
            <ProjectItem
                title="Space Shooter"
                description="Survive as long as possible through Touhou waves."
                href={resolve("/pages/games/spaceshooter-prototype")}
                cover={asset("/assets/covers/space-shooter.png")}
            />
            <ProjectItem
                title="Lethal Museum"
                description="Adds a built-in tracker in Lethal Company for Museum%."
                href="https://thunderstore.io/c/lethal-company/p/WarperSan/LethalMuseum/"
                cover="https://gcdn.thunderstore.io/live/repository/icons/WarperSan-LethalMuseum-1.1.0.png"
            />
            <ProjectItem
                title="Ship Inventory"
                description="Adds an inventory to the ship in Lethal Company."
                href="https://thunderstore.io/c/lethal-company/p/LethalCompanyModding/ShipInventoryUpdated/"
                cover="https://gcdn.thunderstore.io/live/repository/icons/LethalCompanyModding-ShipInventoryUpdated-2.0.8.png"
            />
            <ProjectItem
                title="Whatcha Got There?"
                description="Shows what equipment an ally is currently holding in Risk of Rain 2."
                href="https://thunderstore.io/package/WarperSan/WhatchaGotThere/"
                cover="https://gcdn.thunderstore.io/live/repository/icons/WarperSan-WhatchaGotThere-1.0.1.png"
            />
        </div>
    </section>
</article>
