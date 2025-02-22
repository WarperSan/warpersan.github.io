window.onload = function () {
    let originalInput = document.getElementById("originalInput");
    let modifiedInput = document.getElementById("modifiedInput");
    let addedOutput = document.getElementById("addedOutput");
    let changedOutput = document.getElementById("changedOutput");
    let removedOutput = document.getElementById("removedOutput");
    

    function onClick() {
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
    }

    function setValue(t, o) {
        if (o !== undefined && Object.keys(o).length != 0)
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

    // --- EVENT LISTENER ---
    let btn = document.getElementById("compareButton");
    btn.addEventListener("click", function () {
        try {
            onClick();
        } catch (error) {
            onError(error);
            console.log(error);
        }
    });

    let prettifyBtn = document.getElementById("prettifyButton");
    prettifyBtn.addEventListener("click", function () {
        try {
            let original = JSON.parse(originalInput.value);
            let modified = JSON.parse(modifiedInput.value);

            // Prettify inputs
            originalInput.value = JSON.stringify(original, null, 2);
            modifiedInput.value = JSON.stringify(modified, null, 2);
        } catch (error) {
            onError(error);
            console.log(error);
        }
    });

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
}