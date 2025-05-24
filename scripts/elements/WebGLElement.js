function setupGamePlayer(player, overlay) {
    if (!player.hasAttribute("src"))
        return;

    const iframeDoc = player.contentDocument || player.contentWindow.document;
    const gameCanvas = iframeDoc.querySelector("canvas");

    if (!gameCanvas)
        return;

    gameCanvas.addEventListener("blur", () => {
        overlay.style.display = "block";
        overlay.style.pointerEvents = "none";
    });

    gameCanvas.addEventListener("focus", () => {
        overlay.style.display = "none";
    });

    gameCanvas.classList.add("web-game-content");
    Object.assign(gameCanvas.style, {
        width: "100%",
        height: "100%",
        aspectRatio: "16 / 9",
    });
}

function createIcon(classNames, title) {
    const icon = document.createElement("i");
    icon.className = classNames;
    icon.title = title;
    return icon;
}

function createButton(classNames, title, onClick) {
    const button = createIcon(classNames, title);
    button.addEventListener("click", onClick);
    return button;
}

function createGameContainer(el) {
    const src = window.absoluteSrc(el.getAttribute("src"));
    const mobileAttr = el.getAttribute("mobile");
    const pcAttr = el.getAttribute("pc");

    const isMobile = window.mobileCheck();
    const isPlayable = (isMobile && mobileAttr != null) || (!isMobile && pcAttr != null);

    const container = document.createElement("div");
    container.classList.add("web-game");

    const player = document.createElement("iframe");
    player.classList.add("web-game-player");
    Object.assign(player, {
        allow: "fullscreen",
        allowFullscreen: true,
    });
    Object.assign(player.style, {
        width: "100%",
        aspectRatio: "16 / 9",
    });
    player.setAttribute("allowtransparency", "true");
    player.setAttribute("frameborder", "0");
    player.setAttribute("scrolling", "no");
    player.addEventListener("load", () => setupGamePlayer(player, overlay));

    const overlay = document.createElement("div");
    overlay.classList.add("web-game-foreground");

    if (isPlayable) {
        overlay.title = "Click to Play";
        overlay.classList.add("play");
        overlay.addEventListener("click", () => {
            if (!player.hasAttribute("src"))
                player.setAttribute("src", src);

            overlay.style.display = "none";
        });
    } else {
        overlay.classList.add("error");
        overlay.style.pointerEvents = "none";

        const errorMessage = document.createElement("span");
        errorMessage.textContent = "Not Compatible";
        overlay.appendChild(errorMessage);
    }

    /* CONTROLS */
    const controls = document.createElement("div");
    controls.classList.add("web-game-controls");

    const leftControls = document.createElement("div");
    Object.assign(leftControls.style, {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        gap: "1em"
    });

    if (pcAttr != null) {
        const pcIcon = createIcon("fa-solid fa-desktop", "PC");
        leftControls.appendChild(pcIcon);
    }

    if (mobileAttr != null) {
        const mobileIcon = createIcon("fa-solid fa-mobile-screen", "Mobile");
        leftControls.appendChild(mobileIcon);
    }

    const rightControls = document.createElement("div");
    Object.assign(rightControls.style, {
        flex: 1,
        display: "flex",
        flexDirection: "row-reverse",
        gap: "1em"
    });

    const fullscreenButton = createButton("fa-solid fa-expand", "Fullscreen", () => {
        const reqFullscreen = player.requestFullscreen
            || player.mozRequestFullScreen
            || player.webkitRequestFullscreen
            || player.msRequestFullscreen;

        if (reqFullscreen)
            reqFullscreen.call(player);
    });

    rightControls.appendChild(fullscreenButton);

    controls.appendChild(leftControls);
    controls.appendChild(rightControls);

    container.append(player, overlay, controls);
    el.replaceWith(container);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("webgl").forEach(createGameContainer);
});
