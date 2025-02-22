class RemovalChecker {
    #NOTHING_REMOVED = undefined;

    process(original, modified) {
        return this.#findDifferences(original, modified);
    }

    #findDifferences(original, modified) {

        // If the original value is not set, return no difference
        if (original === undefined)
            return this.#NOTHING_REMOVED;

        // If the modified value is not set, return the difference
        if (modified === undefined)
            return original;

        let type = typeof original;
        let constructor = original.constructor;

        // If the original and the modified are different types, return no difference
        if (type !== typeof modified || constructor !== modified.constructor)
            return this.#NOTHING_REMOVED;

        // If the values are arrays, process them as arrays
        if (constructor === Array)
            return this.#processArray(original, modified);

        // If the values are objects, process them as objects
        if (type === "object")
            return this.#processObject(original, modified);

        // Return no difference
        return this.#NOTHING_REMOVED;
    }

    #processArray(original, modified) {
        let differences = [];

        // Check if every value is equal in each array
        for (const key in original) {
            const originalValue = original[key];
            const modifiedValue = modified[key];

            let difference = this.#findDifferences(originalValue, modifiedValue);

            // If there is a difference, register the difference 
            if (difference !== this.#NOTHING_REMOVED)
                differences.push(difference);
        }

        // If there is a difference, return the difference
        if (differences.length !== 0)
            return differences;

        return this.#NOTHING_REMOVED;
    }

    #processObject(original, modified) {
        let differences = {};

        // Check if every value exits in each array
        for (const key in original) {

            const originalValue = original[key];
            const modifiedValue = modified[key];

            // If the modified does not have the key, register the difference
            if (modified[key] === undefined) {
                differences[key] = originalValue;
                continue;
            }

            let difference = this.#findDifferences(originalValue, modifiedValue);

            // If there is a difference, register the difference
            if (difference !== this.#NOTHING_REMOVED)
                differences[key] = difference;
        }

        // If there is a difference, return the difference
        if (Object.keys(differences).length !== 0)
            return differences;

        return this.#NOTHING_REMOVED;
    }
}