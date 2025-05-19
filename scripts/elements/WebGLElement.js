document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('webgl').forEach(el => {

        const container = document.createElement("div");
        const player = document.createElement("iframe");

        container.classList.add("web-game");

        player.setAttribute("src", el.getAttribute("src") || "");
        player.setAttribute("allow", "autoplay; fullscreen");
        player.setAttribute("allowfullscreen", true);
        player.setAttribute("allowtransparency", true);
        player.setAttribute("frameborder", 0);
        player.setAttribute("scrolling", "no");

        container.appendChild(player);

        el.replaceWith(container);
    });
});