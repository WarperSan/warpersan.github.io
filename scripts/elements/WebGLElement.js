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

    game.style.width = "100%";
    game.style.height = "100%";
    game.style.aspectRatio = "16 / 9";
}

function createControl(classes, title, callback) {
    const button = document.createElement("i");

    button.className = classes;
    button.title = title;
    button.addEventListener("click", callback);

    return button;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('webgl').forEach(el => {
        // ATTRIBUTES
        const src = window.absoluteSrc(el.getAttribute("src"));
        const mobile = el.getAttribute("mobile");
        const pc = el.getAttribute("pc");

        // ELEMENTS
        const container = document.createElement("div");
        const player = document.createElement("iframe");
        const foreground = document.createElement("div");

        // CONTAINER
        container.classList.add("web-game");

        // PLAYER
        player.classList.add("web-game-player");
        player.setAttribute("allow", "fullscreen");
        player.setAttribute("allowfullscreen", true);
        player.setAttribute("allowtransparency", true);
        player.setAttribute("frameborder", 0);
        player.setAttribute("scrolling", "no");
        player.addEventListener("load", () => onPlayerLoaded(player, foreground));
        player.style.aspectRatio = "16 / 9";
        player.style.width = "100%";

        // FOREGROUND
        foreground.classList.add("web-game-foreground");

        const isMobile = window.mobileCheck();
        const isPlayable = isMobile && mobile != null || !isMobile && pc != null;

        if (isPlayable) {
            foreground.title = "Click to Play";
            foreground.classList.add("play");
            foreground.addEventListener("click", e => {
                if (!player.hasAttribute("src"))
                {
                    ;
                    player.setAttribute("src", src);
                }

                foreground.style.display = "none";
            });
        } else {
            foreground.classList.add("error");
            foreground.style.pointerEvents = "none";

            const errorMessage = document.createElement("span");
            errorMessage.textContent = "This game is not compatible with your platform";

            foreground.appendChild(errorMessage);
        }

        // CONTROLS
        const controls = document.createElement("div");
        controls.classList.add("web-game-controls");
        controls.style.display = isPlayable ? "inherit" : "none";

        const fullscreen = createControl("fa-solid fa-expand", "Fullscreen", () => {
            if (player.requestFullscreen) {
                player.requestFullscreen();
            } else if (player.mozRequestFullScreen) { /* Firefox */
                player.mozRequestFullScreen();
            } else if (player.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                player.webkitRequestFullscreen();
            } else if (player.msRequestFullscreen) { /* IE/Edge */
                player.msRequestFullscreen();
            }
        });

        controls.appendChild(fullscreen);

        container.appendChild(player);
        container.appendChild(foreground);
        container.appendChild(controls);

        el.replaceWith(container);
    });
});