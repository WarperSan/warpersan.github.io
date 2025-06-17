function createTip(el) {
    const container = document.createElement("p");

    container.innerHTML = el.innerHTML;

    container.classList.add("tip");

    return container;
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('help').forEach(el => {
        const tip = createTip(el);
        tip.classList.add("help");
        tip.innerHTML = "<strong>Note:</strong> " + tip.innerHTML;

        el.replaceWith(tip);
    });

    document.querySelectorAll('warning').forEach(el => {
        const tip = createTip(el);
        tip.classList.add("warning");
        tip.innerHTML = "<strong>Warning:</strong> " + tip.innerHTML;

        el.replaceWith(tip);
    });

    document.querySelectorAll('alert').forEach(el => {
        const tip = createTip(el);
        tip.classList.add("alert");
        tip.innerHTML = "<strong>Alert:</strong> " + tip.innerHTML;

        el.replaceWith(tip);
    });
});