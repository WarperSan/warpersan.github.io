class Converter {
    #reader;
    #view;
    #offset;

    constructor(buffer) {
        this.#reader = new BinaryReader(buffer);
    }

    process() {
        if (this.#reader.readString(4) != "DDS ")
            throw new Error('Invalid magic number.');

        const header = this.#processHeader();

        const buffer = new Uint32Array(header.width * header.height * 4);

        switch (header.pixelFormat.fourCC) {
            case "ATCI":
                this.#processATCI(buffer, header.width, header.height);
                break;
            case "ATCA":
                this.#processATCA(buffer, header.width, header.height);
                break;
            default:
                throw new Error('Unsupported format.');
        }

        return {
            width: header.width,
            height: header.height,
            data: buffer
        };
    }

    #processHeader() {
        const header = {};
        const HEADER_SIZE = 124;

        if (this.#reader.readUint() !== HEADER_SIZE)
            throw new Error('Invalid header size.');

        header.flags = this.#reader.readInt();
        header.height = this.#reader.readUint();
        header.width = this.#reader.readUint();
        header.pitchOrLinsize = this.#reader.readUint();
        header.depth = this.#reader.readUint();
        header.mipMapCount = this.#reader.readUint();

        this.#reader.skip(44);

        header.pixelFormat = this.#processPixelFormat();
        header.surfaceComplexity = this.#reader.readInt();
        header.additionalSurfaceDetails = this.#reader.readInt();

        this.#reader.skip(12);

        return header;
    }

    #processPixelFormat() {
        const pixelFormat = {};
        const PIXEL_FORMAT_SIZE = 32;

        if (this.#reader.readUint() != PIXEL_FORMAT_SIZE)
            throw new Error('Invalid pixel format size.');

        pixelFormat.flags = this.#reader.readUint();
        pixelFormat.fourCC = this.#reader.readString(4);
        pixelFormat.bpp = this.#reader.readUint();
        pixelFormat.redMask = this.#reader.readUint();
        pixelFormat.greenMask = this.#reader.readUint();
        pixelFormat.blueMask = this.#reader.readUint();
        pixelFormat.alphaMask = this.#reader.readUint();

        return pixelFormat;
    }

    #processATCI(buffer, width, height) {
        const BLOCK_SIZE = 4;
        const SCALE_5 = 255 / 31;
        const SCALE_6 = 255 / 63;

        const alphaTable = new Uint8Array(8);
        const colorTable = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        for (let y = 0; y < height; y += BLOCK_SIZE) {
            for (let x = 0; x < width; x += BLOCK_SIZE) {

                // Decode alpha values
                const alphaBits = this.#reader.readUlong();
                const startAlpha = Number(alphaBits & 0xFFn);
                const endAlpha = Number(alphaBits >> 8n & 0xFFn);
                const alphaMask = Number(alphaBits >> 16n & 0xFFFFFFFFFFFFn);

                alphaTable[0] = startAlpha;
                alphaTable[1] = endAlpha;

                if (startAlpha > endAlpha) {
                    alphaTable[2] = (6 * startAlpha + 1 * endAlpha) / 7;
                    alphaTable[3] = (5 * startAlpha + 2 * endAlpha) / 7;
                    alphaTable[4] = (4 * startAlpha + 3 * endAlpha) / 7;
                    alphaTable[5] = (3 * startAlpha + 4 * endAlpha) / 7;
                    alphaTable[6] = (2 * startAlpha + 5 * endAlpha) / 7;
                    alphaTable[7] = (1 * startAlpha + 6 * endAlpha) / 7;
                } else {
                    alphaTable[2] = (4 * startAlpha + 1 * endAlpha) / 5;
                    alphaTable[3] = (3 * startAlpha + 2 * endAlpha) / 5;
                    alphaTable[4] = (2 * startAlpha + 3 * endAlpha) / 5;
                    alphaTable[5] = (1 * startAlpha + 4 * endAlpha) / 5;
                    alphaTable[6] = 0;
                    alphaTable[7] = 255;
                }

                // Decode color values
                const c0 = this.#reader.readUshort();
                const c1 = this.#reader.readUshort();
                const colorIndices = this.#reader.readUint();

                const c0b = (c0 & 31) * SCALE_5;
                const c0g = (c0 >> 5 & 31) * SCALE_5;
                const c0r = (c0 >> 10 & 31) * SCALE_5;

                const c1b = (c1 & 31) * SCALE_5;
                const c1g = (c1 >> 5 & 63) * SCALE_6;
                const c1r = (c1 >> 11 & 31) * SCALE_5;

                // Compute interpolated colors
                colorTable[0][0] = c0r;
                colorTable[0][1] = c0g;
                colorTable[0][2] = c0b;

                colorTable[1][0] = (2 * c0r + c1r) / 3;
                colorTable[1][1] = (2 * c0g + c1g) / 3;
                colorTable[1][2] = (2 * c0b + c1b) / 3;

                colorTable[2][0] = (c0r + 2 * c1r) / 3;
                colorTable[2][1] = (c0g + 2 * c1g) / 3;
                colorTable[2][2] = (c0b + 2 * c1b) / 3;

                colorTable[3][0] = c1r;
                colorTable[3][1] = c1g;
                colorTable[3][2] = c1b;

                for (let bY = 0; bY < BLOCK_SIZE && y + bY < height; bY++) {
                    for (let bX = 0; bX < BLOCK_SIZE && x + bX < width; bX++) {
                        const index = bY * BLOCK_SIZE + bX;

                        // Read color
                        const colorIndex = (colorIndices >> (index * 2)) & 0x03;
                        const color = colorTable[colorIndex];

                        //Read alpha
                        const alphaIndex = alphaMask >> index * 3 & 0x7;
                        const alpha = alphaTable[alphaIndex];

                        // Assign color
                        const destIndex = ((y + bY) * width + (x + bX)) * 4;

                        buffer[destIndex + 0] = color[0];
                        buffer[destIndex + 1] = color[1];
                        buffer[destIndex + 2] = color[2];
                        buffer[destIndex + 3] = alpha;
                    }
                }
            }
        }
    }

    #processATCA(buffer, width, height) {
        const BLOCK_SIZE = 4;
        const SCALE_5 = 255 / 31;
        const SCALE_6 = 255 / 63;

        const colorTable = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        for (let y = 0; y < height; y += BLOCK_SIZE) {
            for (let x = 0; x < width; x += BLOCK_SIZE) {
                const alphaBits = this.#reader.readUlong();

                // Decode color values
                const c0 = this.#reader.readUshort();
                const c1 = this.#reader.readUshort();
                const colorIndices = this.#reader.readUint();

                const c0b = (c0 & 31) * SCALE_5;
                const c0g = (c0 >> 5 & 31) * SCALE_5;
                const c0r = (c0 >> 10 & 31) * SCALE_5;

                const c1b = (c1 & 31) * SCALE_5;
                const c1g = (c1 >> 5 & 63) * SCALE_6;
                const c1r = (c1 >> 11 & 31) * SCALE_5;

                // Compute interpolated colors
                colorTable[0][0] = c0r;
                colorTable[0][1] = c0g;
                colorTable[0][2] = c0b;

                colorTable[1][0] = (2 * c0r + c1r) / 3;
                colorTable[1][1] = (2 * c0g + c1g) / 3;
                colorTable[1][2] = (2 * c0b + c1b) / 3;

                colorTable[2][0] = (c0r + 2 * c1r) / 3;
                colorTable[2][1] = (c0g + 2 * c1g) / 3;
                colorTable[2][2] = (c0b + 2 * c1b) / 3;

                colorTable[3][0] = c1r;
                colorTable[3][1] = c1g;
                colorTable[3][2] = c1b;

                // Populate pixels
                for (let bY = 0; bY < BLOCK_SIZE && y + bY < height; bY++) {
                    for (let bX = 0; bX < BLOCK_SIZE && x + bX < width; bX++) {
                        const index = bY * BLOCK_SIZE + bX;

                        // Read color
                        const colorIndex = (colorIndices >> (index * 2)) & 0x03;
                        const color = colorTable[colorIndex];

                        // Read alpha
                        const alpha4 = Number((alphaBits >> BigInt(4 * index)) & 0b1111n);
                        const alpha8 = (alpha4 << 4) | alpha4;

                        // Assign color
                        const destIndex = ((y + bY) * width + (x + bX)) * 4;

                        buffer[destIndex + 0] = color[0];
                        buffer[destIndex + 1] = color[1];
                        buffer[destIndex + 2] = color[2];
                        buffer[destIndex + 3] = alpha8;
                    }
                }
            }
        }
    }
}