//===============================//
//                               //
// Copyright Bluebotlaboratories //
//                               //
//===============================//

var versionInt = 2;
var versionString = 'v1.2.0'

// Clear localStorage log
//window.localStorage.setItem("latest.log", JSON.stringify([])) // Empty log

// Log js errors to log
addEventListener("error", function (event) {
  log(event.message + "\nAt: " + event.lineno + ":" + event.colno + "\nIn: " + event.filename);
  window.mesquito.log(event.message + "\nAt: " + event.lineno + ":" + event.colno + "\nIn: " + event.filename);
});

// Create fancy HTML table to display apps
function generateTable(appList, columns) {
  if (typeof(columns) === 'undefined') {
    columns = 3;
  }

  log("Apps:");
  log(JSON.stringify(appList));

  // Create list for app manifest fetching
  var appManifestPromises = [];

  for (var i = 0; i < appList.length; i++) {
    log(appList[i].path + "manifest.json");
    // Add app manifest promise to list
    appManifestPromises.push(fetchFile(joinPaths(appList[i].path, "/manifest.json")));
  }

  // Execute all promises
  Promise.all(appManifestPromises).then(function (appManifests) {
    log("Obtained manifests");
    log(JSON.stringify(appManifests));

    var parsedManifests = []; // Store parsed manifests
    for (var i = 0; i < appManifests.length; i++) {
      // Parse manifest file
      var appData = JSON.parse(appManifests[i]);
      // Handle different manifest versions
      switch (appData.manifestVersion) {
        case 2:
          if (appData.minVersion > versionInt) {
            continue;
          }
          if (appData.id == "com.kwebbrew.settings") {
            continue;
          }
          break;
      }

      parsedManifests.push(appData);
    }

    // Loop through app manifests
    for (var i = 0; i < parsedManifests.length; i++) {
      if (i % columns == 0 && i != 0) {
        // If it is the end of a row, add the row to the table and create a new row
        document.getElementById("appTable").appendChild(tableRow);
        var tableRow = document.createElement("tr");
        tableRow.class = "appRow";
      } else if (i == 0) {
        // If it is the first row, create a new row without adding the (non-existent) previous row to the body
        var tableRow = document.createElement("tr");
        tableRow.classList.add("appRow");
      }

      // Try/Catch for malformed manifests
      try {
        if (!parsedManifests[i].waf) {
          window.mesquito.log("App is not waf: " + parsedManifests[i].name)
          parsedManifests[i].waf = false;
        }

        // Create table cell
        const appCell = document.createElement("td");
        appCell.classList.add("app");

        // Create app link (cross-reference path from the appList since the manifest doesn't contain it)
        const appAnchor = document.createElement("a");
        if (parsedManifests[i].waf) {
          appAnchor.href = joinPaths("file:///mnt/us/apps/" + parsedManifests[i].id, parsedManifests[i].entrypoint);
        } else {
          appAnchor.href = 'file:///mnt/us/mesquito/compatabilityWrapper.html?entrypoint=' + encodeURIComponent(joinPaths("file:///mnt/us/apps/" + parsedManifests[i].id, parsedManifests[i].entrypoint)); // Backwards compatability with non-WAF apps
        }

        // Create app icon element
        const appImage = document.createElement("img");
        appImage.src = joinPaths("file:///mnt/us/apps/" + parsedManifests[i].id, parsedManifests[i].icon);

        // Create app title element
        const appName = document.createElement("p");
        appName.innerText = parsedManifests[i].name;

        // Add all the elements together
        appAnchor.appendChild(appImage);
        appAnchor.appendChild(appName);
        appCell.appendChild(appAnchor);
        tableRow.appendChild(appCell);
      }
      catch (error) {
        // Send error to log
        log("APP ERROR [" + parsedManifests[i].name + "]" + error.toString());
      }
    }

    // Add the last row to the table
    document.getElementById("appTable").appendChild(tableRow);
  });
}

// The logging function
function log(logData) {
  var p = document.createElement("p");
  p.innerText = logData.toString();
  document.getElementById("log").appendChild(p);

  // var currentLog = JSON.parse(window.localStorage.getItem("latest.log"));
  // currentLog.push(new Date().toISOString() + " - " + logData);
  // window.localStorage.setItem("latest.log", JSON.stringify(currentLog));
}

// Toggles the display of the log
function toggleLog() {
  const logElement = document.getElementById("log");

  if (logElement.style.getPropertyValue("display") == "none") {
    document.getElementById("log").style.setProperty("display", "block");
  } else {
    document.getElementById("log").style.setProperty("display", "none");
  }
}

function onPageLoad() {
  // Setup config if not already setup
  if (!window.localStorage.getItem("com.mesquito.settings.theme")) {
    log("No theme setting found, setting to default.")
    window.localStorage.setItem("com.mesquito.settings.theme", "file:///mnt/us/mesquito/themes/com.mesquito.defaultTheme/default.css")
  }
  // Load Theme
  var themeLoader = document.createElement("link");
  themeLoader.href = window.localStorage.getItem("com.mesquito.settings.theme");
  themeLoader.setAttribute("rel", "stylesheet");
  document.body.appendChild(themeLoader);
  log("Mesquito - " + versionString);
  log("Theme loaded");
  log(themeLoader.href);

  // Actually do the stuff
  // Get directory info for apps
  getDirectory("file:///mnt/us/apps/").then(function (data) {
    document.getElementById("loading").remove()
    // Generate the actual table given the list of app folders
    generateTable(data);
  });
}