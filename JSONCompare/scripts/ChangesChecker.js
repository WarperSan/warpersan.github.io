class ChangesChecker {
    #NOTHING_CHANGED = undefined;

    process(original, modified) {
        return this.#findDifferences(original, modified);
    }

    #findDifferences(original, modified) {
        // If one of the values is not set, return no difference
        if (modified === undefined || original === undefined)
            return this.#NOTHING_CHANGED;

        // If the values are the same, return no difference;
        if (original === modified)
            return this.#NOTHING_CHANGED;

        // If only one of the values is null, return the difference
        if (original === null && modified !== null || original !== null && modified === null)
            return original;

        // If the original and the modified are different types, return the difference
        if (typeof original !== typeof modified)
            return original;

        if (original.constructor !== modified.constructor)
            return original;

        // If the values are arrays, process them as arrays
        if (original.constructor === Array)
            return this.#processArray(original, modified);

        // If the values are objects, process them as objects
        if (typeof original === "object")
            return this.#processObject(original, modified);

        // Return the difference
        return original;
    }

    #processArray(original, modified) {
        let differences = [];

        // Check if every value is equal in each array
        for (const key in original) {
            const originalValue = original[key];
            const modifiedValue = modified[key];

            let difference = this.#findDifferences(originalValue, modifiedValue);

            // If there is a difference, register the difference 
            if (difference !== this.#NOTHING_CHANGED)
                differences.push(difference);
        }

        // If there is a difference, return the difference
        if (differences.length !== 0)
            return differences;

        return this.#NOTHING_CHANGED;
    }

    #processObject(original, modified) {
        let differences = {};

        // Check if every value exits in each array
        for (const key in original) {

            const originalValue = original[key];
            const modifiedValue = modified[key];

            // If the modified does not have the key, register the difference
            if (original[key] === undefined) {
                differences[key] = originalValue;
                continue;
            }

            let difference = this.#findDifferences(originalValue, modifiedValue);

            // If there is a difference, register the difference
            if (difference !== this.#NOTHING_CHANGED)
                differences[key] = difference;
        }

        // If there is a difference, return the difference
        if (Object.keys(differences).length !== 0)
            return differences;

        return this.#NOTHING_CHANGED;
    }
}