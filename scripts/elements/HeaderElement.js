class Header extends HTMLElement {
    connectedCallback() {
        const header = document.createElement("header");
        const icons = document.createElement("div");

        const home = this.createIcon("index.html", "fa-solid fa-house", "Home");
        const aboutMe = this.createIcon("pages/about-me.html", "fa-solid fa-user", "About Me");
        const articles = this.createIcon("pages/articles/index.html", "fa-solid fa-newspaper", "Articles");
        const games = this.createIcon("pages/games/index.html", "fa-solid fa-dice", "Games");
        const tools = this.createIcon("pages/tools/index.html", "fa-solid fa-wrench", "Online Tools");

        icons.id = "headerIcons";

        icons.appendChild(home);
        icons.appendChild(aboutMe);
        icons.appendChild(articles);
        icons.appendChild(games);
        icons.appendChild(tools);

        header.appendChild(icons);

        this.replaceWith(header);
    }

    createIcon(url, classes, title) {
        const link = document.createElement("a");
        link.href = window.absoluteSrc(url);
        link.classList.add("headerIcon");
        link.title = title;

        const icon = document.createElement("i");
        icon.className = classes;

        const label = document.createElement("span");
        label.innerText = title;

        link.appendChild(icon);
        link.appendChild(label);

        return link;
    }
}

customElements.define("custom-header", Header);