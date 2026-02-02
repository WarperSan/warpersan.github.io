function getAllLanguages() {
    const codeBlocks = document.getElementsByTagName("code-block");

    const languages = new Set();

    for (const block of codeBlocks) {
        const lang = block.getAttribute("lang");

        if (lang == null)
            return;

        languages.add(lang);
    }

    return Array.from(languages);
}

async function initPrism(languages) {
    window.loadStylesheet("https://cdn.jsdelivr.net/npm/prismjs/themes/prism-tomorrow.css");
    await window.loadScript('https://cdn.jsdelivr.net/npm/prismjs/prism.js');

    for (const lang of languages)
        await window.loadScript(`https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-${lang}.min.js`);

    Prism.highlightAll();
}

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

const languages = getAllLanguages();
initPrism(languages);
customElements.define("code-block", Code);