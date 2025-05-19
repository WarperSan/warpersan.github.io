function onPlayerLoaded(player, foreground) {
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
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('webgl').forEach(el => {
        const src = el.getAttribute("src");
        const mobile = el.getAttribute("mobile");
        const pc = el.getAttribute("pc");

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
        player.addEventListener("load", () => onPlayerLoaded(player, foreground));

        foreground.classList.add("web-game-foreground");

        const isMobile =  window.mobileCheck && window.mobileCheck();
        const isPlayable = isMobile && mobile != null || !isMobile && pc != null;

        if (isPlayable) {
            foreground.title = "Click to Play";
            foreground.classList.add("play");
            foreground.addEventListener("click", e => {
                if (!player.hasAttribute("src"))
                    player.setAttribute("src", src);

                foreground.style.display = "none";
            });
        } else {
            foreground.title = "Your platform is not compatible with this game";
            foreground.classList.add("error");
            foreground.style.pointerEvents = "none";
        }

        container.appendChild(player);
        container.appendChild(foreground);

        el.replaceWith(container);
    });
});