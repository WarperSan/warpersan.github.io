document.addEventListener('DOMContentLoaded', () => {
    function createIcon(url, classes, title) {
        const link = document.createElement("a");
        const icon = document.createElement("i");

        link.href = window.absoluteSrc(url);
        link.classList.add("headerIcon");
        link.title = title;
        icon.className = classes;

        link.appendChild(icon);

        return link;
    }

    document.querySelectorAll('custom-header').forEach(el => {
        const nav = document.createElement("nav");
        const title = document.createElement("span");
        const icons = document.createElement("div");

        const home = createIcon("index.html", "fa-solid fa-house", "Home");

        title.innerText = "WarperSan";
        icons.id = "headerIcons";


        icons.appendChild(home);
        nav.appendChild(title);
        nav.appendChild(icons);

        el.replaceWith(nav);
    });
});