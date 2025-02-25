
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

        // If one of the values is null, return no difference
        if (original === null || modified === null)
            return this.#NOTHING_ADDED;

        // If the original and the modified are different types, return the difference
        if (typeof original !== typeof modified)
            return original;

        if (original.constructor !== modified.constructor)
            return original;

        // If the values are arrays, process them as arrays
        if (modified.constructor === Array)
            return this.#processArray(original, modified);

        // If the values are objects, process them as objects
        if (typeof modified === "object")
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