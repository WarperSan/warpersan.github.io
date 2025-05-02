document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('project-control').forEach(el => {
        const link = document.createElement("a");
        
        const type = el.getAttribute("type") || "code";
        const url = el.getAttribute("href") || "";

        if (type === "code") {
            link.innerText = "View Code";
        } else if (type === "play") {
            link.innerText = "Play";
        }

        link.href = url;
        link.target = "_blank";
        el.replaceWith(link);
    });
});