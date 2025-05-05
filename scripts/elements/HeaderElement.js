document.addEventListener('DOMContentLoaded', () => {
    function createIcon(url, classes, title) {
        const link = document.createElement("a");
        const icon = document.createElement("i");
        const label = document.createElement("span");

        link.href = new URL(url, window.location.origin);
        link.classList.add("headerIcon");
        label.innerText = title;
        icon.className = classes;

        link.appendChild(icon);
        //link.appendChild(label);

        return link;
    }

    document.querySelectorAll('custom-header').forEach(el => {
        const nav = document.createElement("nav");
        const title = document.createElement("span");
        const icons = document.createElement("div");

        const home = createIcon("index.html", "fa-solid fa-house", "Home");
        const projects = createIcon("skills.html", "fa-solid fa-wrench", "Skills");

        title.innerText = "WarperSan";
        icons.id = "headerIcons";


        icons.appendChild(home);
        icons.appendChild(projects);
        nav.appendChild(title);
        nav.appendChild(icons);

        el.replaceWith(nav);
    });
});