<svelte:head>
    <title>Projects</title>
    <link href="/styles/pages/projects.css" rel="stylesheet">
    <script src="/scripts/elements/ProjectCardElement.js"></script>
</svelte:head>

<article>
    <section>
        <h2>Projects</h2>
        <p>
            A collection of projects I have made over the years. This includes games, mods, tools, interactive
            experiences.
        </p>
        <div id="projects-container" style="background-color: var(--bg);">
            <project-card title="ThunderPipe"
                description="A CLI tool for validating and publishing packages to Thunderstore."
                href="https://github.com/WarperSan/ThunderPipe"
                cover="https://raw.githubusercontent.com/WarperSan/ThunderPipe/refs/heads/master/icon.png"></project-card>
            <project-card title="FiddleStick's Maze" description="Escape FiddleStick's realm before he catches you."
                href="/pages/games/fiddlesticks-maze.html"
                cover="https://img.itch.zone/aW1nLzE5MjcwNzMxLnBuZw==/original/6oe9o6.png"></project-card>
            <project-card title="Game of Danger"
                description="Solve the Problems by using &quot;Out-of-the-box&quot; solutions."
                href="/pages/games/game-of-danger-prototype.html"
                cover="https://img.itch.zone/aW1hZ2UvMjM1NjcxOC8xMzk2MDQ4MC5wbmc=/original/VcmHOH.png"></project-card>
            <project-card title="Hotel" description="Find the source of the Haunting."
                href="/pages/games/hotel-prototype.html"
                cover="https://img.itch.zone/aW1hZ2UvMTkyMTcyMi8xMzk2MDY4Ny5wbmc=/original/HTFeXZ.png"></project-card>
            <project-card title="Space Shooter" description="Survive as long as possible through Touhou waves."
                href="/pages/games/spaceshooter-prototype.html"></project-card>
            <project-card title="Lethal Museum" description="Adds a built-in tracker in Lethal Company for Museum%."
                href="https://thunderstore.io/c/lethal-company/p/WarperSan/LethalMuseum/"
                cover="https://gcdn.thunderstore.io/live/repository/icons/WarperSan-LethalMuseum-1.1.0.png"></project-card>
            <project-card title="Ship Inventory" description="Adds an inventory to the ship in Lethal Company."
                href="https://thunderstore.io/c/lethal-company/p/LethalCompanyModding/ShipInventoryUpdated/"
                cover="https://gcdn.thunderstore.io/live/repository/icons/LethalCompanyModding-ShipInventoryUpdated-2.0.8.png"></project-card>
            <project-card title="Whatcha Got There?" description="Shows what equipment an ally is currently holding in Risk of Rain 2."
                href="https://thunderstore.io/package/WarperSan/WhatchaGotThere/"
                cover="https://gcdn.thunderstore.io/live/repository/icons/WarperSan-WhatchaGotThere-1.0.1.png"></project-card>
        </div>
    </section>
</article>