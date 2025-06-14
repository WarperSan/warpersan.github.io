class FileItem {
    #file;

    #icon;
    #loadingBar;
    #loadingStatus;
    #output;

    constructor(parent, file) {
        this.#file = file;

        parent.appendChild(this.#createElement());
    }

    #createElement() {
        const container = document.createElement("div");
        container.classList.add("file-item");

        // Icon
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-hourglass-start";

        // Name
        const name = document.createElement("span");
        name.classList.add("file-name");
        name.innerText = this.#file.name;

        // Loading
        const loadingContainer = document.createElement("div");
        loadingContainer.classList.add("file-loading");

        const loadingContent = document.createElement("div");

        loadingContainer.appendChild(loadingContent);

        const loadingStatus = document.createElement("span");

        // Output
        const output = document.createElement("a");
        output.target = "_blank";

        const outputIcon = document.createElement("i");
        outputIcon.className = "fa-solid fa-download";

        output.appendChild(outputIcon);

        container.appendChild(icon);
        container.appendChild(name);
        container.appendChild(loadingContainer);
        container.appendChild(loadingStatus);
        container.appendChild(output);

        this.#icon = icon;
        this.#loadingBar = loadingContent;
        this.#loadingStatus = loadingStatus;
        this.#output = output;

        return container;
    }

    #setBarProgress(value) {
        this.#loadingBar.style.width = Math.min(100, Math.max(value, 0)) + "%";
    }

    #setBarName(name) {
        this.#loadingStatus.innerText = name;
    }

    async process() {
        var buffer = await this.#readFile();
        var dds = await this.#processBuffer(buffer);
        var url = await this.#processTexture(dds.width, dds.height, dds.data);

        this.#output.href = url;

        this.#icon.className = "fa-solid fa-check";
        this.#setBarName("Done");
    }

    #readFile() {
        const reader = new FileReader();

        reader.onloadstart = () => {
            this.#icon.className = "fa-solid fa-spinner";
            this.#setBarProgress(0);
            this.#setBarName("Uploading");
        };

        reader.onprogress = (e) => {
            if (e.lengthComputable) {
                this.#setBarProgress((e.loaded / e.total) * 100);
            }
        };

        reader.onloadend = () => this.#setBarProgress(100);

        return new Promise((resolve) => {
            reader.onload = (e) => {
                resolve(e.target.result);
            };

            reader.readAsArrayBuffer(this.#file);
        });
    }

    #processBuffer(buffer) {
        return new Promise((resolve, reject) => {
            this.#setBarProgress(0);
            this.#setBarName("Converting");

            try {
                const dds = new Converter(buffer).process();
                resolve(dds);
            } catch (error) {
                reject(error);
            }

            this.#setBarProgress(100);
        });
    }

    #processTexture(width, height, pixels) {

        return new Promise((resolve) => {
            this.#setBarProgress(0);
            this.#setBarName("Processing");

            const imageData = new ImageData(
                new Uint8ClampedArray(pixels),
                width,
                height
            );

            const canvas = document.getElementById('canvas');
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            const ctx = canvas.getContext('2d');
            ctx.putImageData(imageData, 0, 0);

            // Export to PNG and display in img
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);

                resolve(url);
                this.#setBarProgress(100);
            }, 'image/png');
        });
    }
}