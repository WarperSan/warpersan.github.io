document.addEventListener('DOMContentLoaded', () => {
    function createIcon(url, classes, title) {
        const link = document.createElement("a");
        const icon = document.createElement("i");

        link.href = url;
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
        const projects = createIcon("projects/index.html", "fa-solid fa-list-check", "Projects");

        title.innerText = "WarperSan";
        icons.appendChild(home);
        icons.appendChild(projects);

        nav.appendChild(title);
        nav.appendChild(icons);

        el.replaceWith(nav);
    });
});