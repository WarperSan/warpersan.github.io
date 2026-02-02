class Skill extends HTMLElement {
    connectedCallback() {
        const container = document.createElement("div");
        const icon = document.createElement("i");
        const label = document.createElement("span");

        container.classList.add("skill");
        icon.className = this.className;
        label.innerText = this.textContent;

        container.appendChild(icon);
        container.appendChild(label);

        this.replaceWith(container);
    }
}

customElements.define("skill-icon", Skill);