window.onload = function () {
    let fileInput = document.getElementById('file-input');

    fileInput.onchange = () => {
        const itemContainer = document.getElementById("file-items");
        itemContainer.innerHTML = "";

        for (let file of fileInput.files)
        {
            if (file.type != "image/x-dds")
                continue;
            
            const fileItem = new FileItem(itemContainer, file);

            fileItem.process();
        }
    };
};