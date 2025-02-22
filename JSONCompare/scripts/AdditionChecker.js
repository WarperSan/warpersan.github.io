
class AdditionChecker {
    #NOTHING_ADDED = undefined;

    process(original, modified) {
        return this.#findDifferences(original, modified);
    }

    #findDifferences(original, modified) {

        // If the modified value is not set, return no difference
        if (modified === undefined)
            return this.#NOTHING_ADDED;

        // If the original value is not set, return the difference
        if (original === undefined)
            return modified;

        let type = typeof modified;
        let constructor = modified.constructor;

        // If the original and the modified are different types, return no difference
        if (type !== typeof original || constructor !== original.constructor)
            return this.#NOTHING_ADDED;

        // If the values are arrays, process them as arrays
        if (constructor === Array)
            return this.#processArray(original, modified);

        // If the values are objects, process them as objects
        if (type === "object")
            return this.#processObject(original, modified);

        // Return no difference
        return this.#NOTHING_ADDED; 
    }

    #processArray(original, modified) {
        let differences = [];

        // Check if every value is equal in each array
        for (const key in modified) {
            const originalValue = original[key];
            const modifiedValue = modified[key];

            let difference = this.#findDifferences(originalValue, modifiedValue);

            // If there is a difference, register the difference 
            if (difference !== this.#NOTHING_ADDED)
                differences.push(difference);
        }

        // If there is a difference, return the difference
        if (differences.length !== 0)
            return differences;

        return this.#NOTHING_ADDED;
    }

    #processObject(original, modified) {
        let differences = {};

        // Check if every value exits in each array
        for (const key in modified) {

            const originalValue = original[key];
            const modifiedValue = modified[key];

            // If the modified does not have the key, register the difference
            if (original[key] === undefined) {
                differences[key] = modifiedValue;
                continue;
            }

            let difference = this.#findDifferences(originalValue, modifiedValue);

            // If there is a difference, register the difference
            if (difference !== this.#NOTHING_ADDED)
                differences[key] = difference;
        }

        // If there is a difference, return the difference
        if (Object.keys(differences).length !== 0)
            return differences;

        return this.#NOTHING_ADDED;
    }
}