document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('webgl').forEach(el => {
        const src = el.getAttribute("src") || "";

        const container = document.createElement("div");
        const player = document.createElement("iframe");
        const foreground = document.createElement("div");

        container.classList.add("web-game");

        player.classList.add("web-game-player");
        player.setAttribute("allow", "fullscreen");
        player.setAttribute("allowfullscreen", true);
        player.setAttribute("allowtransparency", true);
        player.setAttribute("frameborder", 0);
        player.setAttribute("scrolling", "no");
        player.addEventListener("load", () => {
            if (!player.hasAttribute("src"))
                return;

            const iframeDoc = player.contentDocument || player.contentWindow.document;
            const game = iframeDoc.querySelector("canvas");

            game.addEventListener("blur", () => {
                foreground.style.display = "block";
                foreground.style.pointerEvents = "none";
            });

            game.addEventListener("focus", () => {
                foreground.style.display = "none";
            });

            game.classList.add("web-game-content");

            game.style.maxWidth = "100%";
            game.style.maxHeight = "100%";
            game.style.borderRadius = "1rem";
        });

        foreground.title = "Click to Play";
        foreground.classList.add("web-game-foreground");
        foreground.addEventListener("click", e => {
            if (!player.hasAttribute("src"))
                player.setAttribute("src", src);

            foreground.style.display = "none";
        });

        container.appendChild(player);
        container.appendChild(foreground);

        el.replaceWith(container);
    });
});