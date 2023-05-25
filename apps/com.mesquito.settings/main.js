function onLoad() {
    getDirectory("file:///mnt/us/mesquito/themes/").then(function (themes) {
        log("Got dir");
        log(JSON.stringify(themes));
        var themeManifestPromises = [];
        for (var i = 0; i < themes.length; i++) {
            themeManifestPromises.push(fetchFile(joinPaths(themes[i].path, '/manifest.json')));
        }

        log("Themepromises made")
        Promise.all(themeManifestPromises).then(function (manifestFiles) { // Add theme selector
            log("Resolved themepromise");
            log(JSON.stringify(manifestFiles));
            var selector = document.createElement("select");
            selector.setAttribute("name", "settings.themeSelector");
            selector.setAttribute("id", "settings.themeSelector");

            var currentTheme = window.localStorage.getItem("com.mesquito.settings.theme");
            for (var i = 0; i < manifestFiles.length; i++) {
                var manifestData = JSON.parse(manifestFiles[i]);

                var option = document.createElement("option");
                option.value = joinPaths(themes[i].path, manifestData.entrypoint);
                option.innerHTML = manifestData.name;

                if (currentTheme == option.value) {
                    option.setAttribute("selected", "");
                }

                selector.appendChild(option);
            }
            
            log("Adding selector to document");
            document.getElementById("settings.themeSelectorWrapper").appendChild(selector);
            log("Done!")
        })
    })
}

function saveSettings() {
    window.localStorage.setItem("com.mesquito.settings.theme", document.getElementById("settings.themeSelector").value);
    log("SAVED!");
}

function log(dataToLog) {
    var logEl = document.createElement("p");
    logEl.innerHTML = dataToLog;
    document.getElementById("log").appendChild(logEl);
}