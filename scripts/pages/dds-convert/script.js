window.onload = function () {
    let fileInput = document.getElementById('file-input');

    fileInput.onchange = () => {
        const reader = new FileReader()
        reader.onload = (e) => {
            var dds = new Converter(e.target.result).process();

            // Setup canvas
            const canvas = document.getElementById('canvas');
            canvas.width = dds.width;
            canvas.height = dds.height;
            const ctx = canvas.getContext('2d');

            // Create ImageData and put on canvas
            const imageData = new ImageData(
                new Uint8ClampedArray(dds.data),
                dds.width,
                dds.height
            );
            ctx.putImageData(imageData, 0, 0);

            // Scale canvas up (optional, so you can see it)
            canvas.style.width = '100px';
            canvas.style.height = '100px';
            canvas.style.imageRendering = 'pixelated';

            // Export to PNG and display in img
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                document.getElementById('pngImage').style.backgroundImage = `url('${url}')`;

                // Clean up after loaded
                document.getElementById('pngImage').onload = () => {
                    URL.revokeObjectURL(url);
                };
            }, 'image/png');
        };

        for (let file of fileInput.files)
            reader.readAsArrayBuffer(file)
    };
};