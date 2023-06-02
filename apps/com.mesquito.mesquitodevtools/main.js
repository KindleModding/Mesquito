var lastCommandIndex = -1;
var lastCommands = [];


function log(logStuff) {
    document.getElementById("log").innerHTML += "\n" + logStuff.toString();
    document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
}

function restorePrevious() {
    if (lastCommands.length > 0) {
        if (document.getElementById("consoleInput").value != lastCommands[lastCommandIndex]) {
            document.getElementById("consoleInput").value = lastCommands[lastCommandIndex];
        } else {
            lastCommandIndex -= 1;

            if (lastCommandIndex <= 0) {
                lastCommandIndex = 0;
            }
            document.getElementById("consoleInput").value = lastCommands[lastCommandIndex];
        }
    }

    updateLastCommandList();
}

function restoreNext() {
    if (lastCommands.length > 0) {
        lastCommandIndex += 1;

        if (lastCommandIndex >= lastCommands.length) {
            lastCommandIndex = lastCommands.length - 1;
        }
        document.getElementById("consoleInput").value = lastCommands[lastCommandIndex];
    }

    updateLastCommandList();
}

function updateLastCommandList() {
    const lastCommandDiv = document.getElementById("lastCommands");
    lastCommandDiv.innerHTML = "";
    for (var i = 0; i < lastCommands.length; i++) {
        const p = document.createElement("p");
        p.innerText = lastCommands[i];

        if (i == lastCommandIndex) {
            p.classList.add("activeCommand");
        }

        lastCommandDiv.appendChild(p);
    }
}

function runJS() {
    const code = document.getElementById("consoleInput").value;

    var output = internalRunJS(code)

    document.getElementById("consoleInput").value = "";
    log(output.toString());

    updateLastCommandList();
}

function internalRunJS(code) {
    lastCommands.push(code);
    lastCommandIndex = lastCommands.length - 1;

    try {
        var output = window.eval(code);
    } catch (err) {
        var output = err.name + ": " + err.message;
    }

    if (output == undefined) {
        output = code;
    } else if (typeof (output) == "object") {
        output = JSON.stringify(output);
    }

    return output
}

function serverThink() {
    const IP = document.getElementById("IPInput").value;

    fetch('http://' + IP + '/getCommand').then(function (response) {return response.json()}).then(
        function (response) {
            if (!response.result) {
                return
            }
        
            log("Recieved Command:" + decodeURIComponent(response.result.toString()));
            const result = internalRunJS(decodeURIComponent(response.result.toString()));
            log(result.toString());
            fetch('http://' + IP + '/sendOutput/' + encodeURIComponent(encodeURIComponent(result.toString())));
        }
    )
}

function connectToServer() {
    setInterval(serverThink, 300);
}

function callbackFunction(property, json) {
    log("Callback:");
    log(property);
    log(json);
}

function resultsCallbackFunction(property, json) {
    try {
        log("Search callback:");
        log(JSON.stringify(property))
        log(JSON.stringify(json))
    } catch (e) {}

    var results = {}
    results.searchString = json.searchString;
    results.results = [{
        label: "result1",
        id: "resultone"
    },{
        label: "result2",
        id: "resulttwo"
    }];

    kindle.messaging.sendMessage("com.lab126.pillow", "searchResults", results);
}

function testContext() {
    log("Getting object");
    var kindle = window.kindle || top.kindle;

    log("Setting hook");

    kindle.messaging.receiveMessage("resultsQuery", resultsCallbackFunction);
    window.mesquito.onKindleButton = callbackFunction;

    log("Hook set!");
}