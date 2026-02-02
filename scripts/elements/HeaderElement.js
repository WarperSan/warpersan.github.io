function createIcon(url, classes, title) {
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

class Header extends HTMLElement {
    connectedCallback() {
        const titleText = this.getAttribute("title") ?? document.title;

        const header = document.createElement("header");
        const title = document.createElement("span");
        const icons = document.createElement("div");

        const home = createIcon("index.html", "fa-solid fa-house", "Home");
        const aboutMe = createIcon("pages/about-me.html", "fa-solid fa-user", "About Me");
        const pages = createIcon("pages/index.html", "fa-solid fa-compass", "Pages");
        const tools = createIcon("pages/tools.html", "fa-solid fa-wrench", "Online Tools");
        
        title.innerText = titleText;
        icons.id = "headerIcons";


        icons.appendChild(home);
        icons.appendChild(aboutMe);
        icons.appendChild(pages);
        icons.appendChild(tools);

        header.appendChild(title);
        header.appendChild(icons);

        this.replaceWith(header);
    }
}

customElements.define("custom-header", Header);