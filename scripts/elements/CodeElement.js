function getLanguageClasses(lang) {
    if (lang == "csharp")
        return ["language-csharp"];

    if (lang == "clike")
        return ["language-clike"];

    if (lang == "php")
        return ["language-php"];

    return [];
}

class Code extends HTMLElement {
    static observedAttributes = ["lang"];

    connectedCallback() {
        const language = this.getAttribute("lang") ?? "";
        const classes = getLanguageClasses(language) ?? [];

        const preBlock = document.createElement("pre");
        const codeBlock = document.createElement("code");
        codeBlock.classList.add(...classes);
        codeBlock.innerHTML = this.innerHTML.trim();

        preBlock.appendChild(codeBlock);

        this.replaceWith(preBlock);
    }
}

customElements.define("code-block", Code);