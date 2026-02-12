class ProjectCard extends HTMLElement {
    connectedCallback() {
        const titleText = this.getAttribute("title") ?? document.title;
        const href = this.getAttribute("href") ?? "";
        const descriptionText = this.getAttribute("description") ?? "";
        const coverSrc = this.getAttribute("cover") ?? "";

        const link = document.createElement("a");
        link.href = href;
        link.classList.add("project")

        const topContainer = document.createElement("div");
        topContainer.classList.add("top");

        const image = document.createElement("img");
        image.src = coverSrc;
        topContainer.appendChild(image);

        const bottomContainer = document.createElement("div");
        bottomContainer.classList.add("bottom");

        const title = document.createElement("h3");
        title.innerText = titleText;
        bottomContainer.appendChild(title);

        const description = document.createElement("span");
        description.innerText = descriptionText;
        bottomContainer.appendChild(description);

        link.appendChild(topContainer);
        link.appendChild(bottomContainer);

        this.replaceWith(link);
    }
}

customElements.define("project-card", ProjectCard);