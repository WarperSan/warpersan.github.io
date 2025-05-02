document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('custom-footer').forEach(el => {
        const footer = document.createElement("footer");
        const label = document.createElement("span");

        const year = new Date().getFullYear();
        label.innerText = "© " + year + " WarperSan. All rights reserved.";

        footer.appendChild(label);

        el.replaceWith(footer);
    });
});