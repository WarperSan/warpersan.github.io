class ToolCard extends HTMLElement {
    connectedCallback() {
        const titleText = this.getAttribute("title") ?? document.title;
        const href = this.getAttribute("href") ?? "";
        const iconClasses = this.getAttribute("icon") ?? "";
        const descriptionText = this.getAttribute("description") ?? "";

        const link = document.createElement("a");
        link.href = href;
        link.classList.add("tool")

        const icon = document.createElement("i");
        icon.classList = iconClasses;
        link.appendChild(icon);

        const container = document.createElement("div");
        link.appendChild(container);

        const title = document.createElement("h3");
        title.innerText = titleText;
        container.appendChild(title);

        const description = document.createElement("span");
        description.innerText = descriptionText;
        container.appendChild(description);

        this.replaceWith(link);
    }
}

customElements.define("tool-card", ToolCard);