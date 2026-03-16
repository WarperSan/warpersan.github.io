class BinaryReader {
    #view;
    #offset;

    constructor(buffer) {
        this.#view = new DataView(buffer);
        this.#offset = 0;
    }

    readUshort() {
        const value = this.#view.getUint16(this.#offset, true);
        this.#offset += 2;

        return value;
    }

    readUint() {
        const value = this.#view.getUint32(this.#offset, true);
        this.#offset += 4;

        return value;
    }

    readInt() {
        const value = this.#view.getInt32(this.#offset, true);
        this.#offset += 4;

        return value;
    }

    readUlong() {
        const value = this.#view.getBigUint64(this.#offset, true);
        this.#offset += 8;

        return value;
    }

    readString(length) {
        let chars = [];
        for (let i = 0; i < length; i++) {
            const char = this.#view.getUint8(this.#offset);
            chars.push(String.fromCharCode(char));

            this.#offset++;
        }

        return chars.join('');
    }

    skip(byteCount) {
        this.#offset += byteCount;
    }
}