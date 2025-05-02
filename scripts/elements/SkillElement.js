document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('skill-icon').forEach(el => {
        const container = document.createElement("div");
        const icon = document.createElement("i");
        const label = document.createElement("span");

        container.classList.add("skill");
        icon.className = el.className;
        label.innerText = el.textContent;

        container.appendChild(icon);
        container.appendChild(label);

        el.replaceWith(container);
    });
});