window.onload = function () {
    let originalInput = document.getElementById("originalInput");
    let modifiedInput = document.getElementById("modifiedInput");
    let addedOutput = document.getElementById("addedOutput");
    let changedOutput = document.getElementById("changedOutput");
    let removedOutput = document.getElementById("removedOutput");

    function onClick() {
        try {
            let original = JSON.parse(originalInput.value);
            let modified = JSON.parse(modifiedInput.value);

            // Check for added fields
            let added = new AdditionChecker().process(original, modified);
            setValue(addedOutput, added);

            // Check for removed fields
            let removed = new RemovalChecker().process(original, modified);
            setValue(removedOutput, removed);

            // Check for modified fields
            let changed = new ChangesChecker().process(original, modified);
            setValue(changedOutput, changed);
        } catch (error) {
            onError(error);
            console.log(error);
        }
    }

    function setValue(t, o) {
        if (o !== undefined)
            t.value = JSON.stringify(o, null, 2);
        else
            t.value = "Nothing";
    }

    // --- ERROR ---
    let errorContainer = document.getElementById("errorContainer");
    let errorText = document.getElementById("errorText");
    let errorTimeout = undefined;

    function onError(error) {

        errorText.innerText = error;

        if (errorTimeout !== undefined)
            clearTimeout(errorTimeout);

        errorTimeout = setTimeout(() => {
            errorContainer.style.opacity = 0;
        }, 5_000);

        errorContainer.style.opacity = 1;
    }

    // --- PRETTIFY ---
    function prettifyOriginal(value) {
        try {
            let original = JSON.parse(value);
            originalInput.value = JSON.stringify(original, null, 2);
        } catch (error) {
            onError(error);
            console.log(error);
        }
    }

    function prettifyModified(value) {
        try {
            let modified = JSON.parse(value);
            modifiedInput.value = JSON.stringify(modified, null, 2);
        } catch (error) {
            onError(error);
            console.log(error);
        }
    }

    let prettifyBtn = document.getElementById("prettifyButton");
    prettifyBtn.addEventListener("click", function () {
        prettifyOriginal(originalInput.value);
        prettifyModified(modifiedInput.value);
    });

    // --- PARAMS ---
    function parse_query_string(query) {
        var vars = query.split("&");
        var query_string = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            var key = decodeURIComponent(pair.shift());
            var value = decodeURIComponent(pair.join("="));
            // If first entry with this name
            if (typeof query_string[key] === "undefined") {
                query_string[key] = value;
                // If second entry with this name
            } else if (typeof query_string[key] === "string") {
                var arr = [query_string[key], value];
                query_string[key] = arr;
                // If third or later entry with this name
            } else {
                query_string[key].push(value);
            }
        }
        return query_string;
    }

    var query = window.location.search.substring(1);
    var qs = parse_query_string(query);
    var qsOriginal = qs["original"];
    var qsModified = qs["modified"];

    if (qsOriginal !== undefined)
        prettifyOriginal(qsOriginal);

    if (qsModified !== undefined)
        prettifyModified(qsModified);

    if (qsOriginal !== undefined && qsModified !== undefined)
        onClick();

    // --- EVENT LISTENER ---
    let btn = document.getElementById("compareButton");
    btn.addEventListener("click", onClick);

    let clearAllBtn = document.getElementById("clearAllButton");
    clearAllBtn.addEventListener("click", function () {
        originalInput.value = "";
        modifiedInput.value = "";
        addedOutput.value = "";
        removedOutput.value = "";
        changedOutput.value = "";
    });

    let copyUpButton = document.getElementById("copyUpButton");
    copyUpButton.addEventListener("click", function () {
        originalInput.value = modifiedInput.value;
    });

    let copyDownButton = document.getElementById("copyDownButton");
    copyDownButton.addEventListener("click", function () {
        modifiedInput.value = originalInput.value;
    });

    let swapButton = document.getElementById("swapButton");
    swapButton.addEventListener("click", function() {
        let temp = originalInput.value;
        originalInput.value = modifiedInput.value;
        modifiedInput.value = temp;
    });
}