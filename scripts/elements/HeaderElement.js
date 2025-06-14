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
        const titleText = el.getAttribute("title") ?? document.title;

        const header = document.createElement("header");
        const title = document.createElement("span");
        const icons = document.createElement("div");

        const home = createIcon("index.html", "fa-solid fa-house", "Home");
        const pages = createIcon("pages/index.html", "fa-solid fa-compass", "Pages");

        title.innerText = titleText;
        icons.id = "headerIcons";


        icons.appendChild(home);
        icons.appendChild(pages);

        header.appendChild(title);
        header.appendChild(icons);

        el.replaceWith(header);
    });
});