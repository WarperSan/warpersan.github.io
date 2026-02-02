class WebGLPlayerElement extends HTMLElement {
    static observedAttributes = ["src", "mobile", "pc"];

    connectedCallback() {
        const src = window.absoluteSrc(this.getAttribute("src"));
        const platforms = this.getSupportedPlatforms();
        const isPlayable = this.isPlayable(platforms);

        const container = document.createElement("div");
        container.classList.add("web-game");

        const gameArea = document.createElement("div");
        gameArea.classList.add("game-area");
        container.appendChild(gameArea);

        const player = this.createPlayer(platforms);
        player.addEventListener("load", () => setupGamePlayer(player, overlay));
        gameArea.appendChild(player);

        const overlay = this.createOverlay(isPlayable, () => {
            if (!player.hasAttribute("src"))
                player.setAttribute("src", src);

            overlay.style.display = "none";
        });
        gameArea.appendChild(overlay);

        const controls = this.createControls(platforms, () => {
            const reqFullscreen = player.requestFullscreen
                || player.mozRequestFullScreen
                || player.webkitRequestFullscreen
                || player.msRequestFullscreen;

            if (reqFullscreen)
                reqFullscreen.call(player);
        });
        container.appendChild(controls);

        this.replaceWith(container);
    }

    // Platforms
    getSupportedPlatforms() {
        let platforms = [];

        if (this.hasAttribute("mobile"))
            platforms.push("mobile");

        if (this.hasAttribute("pc"))
            platforms.push("pc");

        return platforms;
    }

    isPlayable(platforms) {
        const isOnMobile = window.mobileCheck();

        if (isOnMobile)
            return platforms.includes("mobile");

        return platforms.includes("pc");
    }

    addPlatformIcons(container, platforms) {
        if (platforms.includes("pc")) {
            const pcIcon = this.createIcon("PC", "fa-solid fa-desktop");
            container.appendChild(pcIcon);
        }

        if (platforms.includes("mobile")) {
            const mobileIcon = this.createIcon("Mobile", "fa-solid fa-mobile-screen");
            container.appendChild(mobileIcon);
        }
    }

    // Game Area
    createPlayer() {
        const player = document.createElement("iframe");
        player.classList.add("web-game-player");
        player.allow = "fullscreen";
        player.allowFullscreen = true;
        player.setAttribute("allowtransparency", "true");
        player.setAttribute("frameborder", "0");
        player.setAttribute("scrolling", "no");

        return player;
    }

    setupPlayer(player, overlay) {
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
    }

    createOverlay(isSupported, onClickToPlay) {
        const overlay = document.createElement("div");
        overlay.classList.add("web-game-foreground");

        if (isSupported) {
            overlay.title = "Click to Play";
            overlay.classList.add("play");
            overlay.addEventListener("click", onClickToPlay);
        } else {
            overlay.classList.add("error");
            overlay.style.pointerEvents = "none";

            const errorMessage = document.createElement("span");
            errorMessage.textContent = "Not Compatible";
            overlay.appendChild(errorMessage);
        }

        return overlay;
    }

    // Controls
    createControls(supportedPlatforms, onFullScreenRequested) {
        const controls = document.createElement("div");
        controls.classList.add("web-game-controls");

        const leftControls = document.createElement("div");
        leftControls.classList.add("left");

        this.addPlatformIcons(leftControls, supportedPlatforms);

        const rightControls = document.createElement("div");
        rightControls.classList.add("right");

        const fullscreenButton = this.createButton("Fullscreen", "fa-solid fa-expand", onFullScreenRequested);

        rightControls.appendChild(fullscreenButton);

        controls.appendChild(leftControls);
        controls.appendChild(rightControls);

        return controls;
    }

    createIcon(title, classes) {
        const icon = document.createElement("i");
        icon.className = classes;
        icon.title = title;
        return icon;
    }

    createButton(title, classes, onClick) {
        const button = this.createIcon(classes, title);
        button.addEventListener("click", onClick);
        return button;
    }
}

customElements.define("webgl-player", WebGLPlayerElement);
