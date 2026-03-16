class Header extends HTMLElement {
    connectedCallback() {
        const container = document.createElement("header");

        const menuBtn = document.createElement("button");
        menuBtn.id = "headerMenu";
        menuBtn.classList.add("fa-solid");

        const iconsList = document.createElement("ul");
        iconsList.id = "headerIcons";

        const navItems = [
            { url: "/", icon: "fa-solid fa-house", title: "Home" },
            { url: "/pages/about-me", icon: "fa-solid fa-user", title: "About Me" },
            { url: "/pages/articles", icon: "fa-solid fa-newspaper", title: "Articles" },
            { url: "/pages/projects", icon: "fa-solid fa-box-archive", title: "Projects" },
            { url: "/pages/tools", icon: "fa-solid fa-wrench", title: "Online Tools" }
        ];

        navItems.forEach(item => {
            iconsList.appendChild(this.createIcon(item.url, item.icon, item.title));
        });

        menuBtn.addEventListener("click", () => {
            iconsList.classList.toggle("open");
        });
        window.addEventListener("click", (event) => {
            if (!iconsList.classList.contains("open"))
                return;

            if (menuBtn.contains(event.target))
                return;

            if (iconsList.contains(event.target))
                return;

            iconsList.classList.remove("open");
        });

        container.appendChild(menuBtn);
        container.appendChild(iconsList);

        this.replaceWith(container);
    }

    createIcon(url, classes, title) {
        const element = document.createElement("li");
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
        element.appendChild(link);

        return element;
    }
}

customElements.define("custom-header", Header);