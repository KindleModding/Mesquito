//===============================//
//                               //
// Copyright Bluebotlaboratories //
//                               //
//===============================//

// DO NOT USE THIS API IN KINDLE APPS, THIS API IS DESIGNED FOR DESKTOP DEVELOPMENT USE ONLY

function fetchFile(url, timeout, fixKindleFormatting) {
  if (typeof(fixKindleFormatting) === 'undefined') {
    fixKindleFormatting=true
  }
  
  return new Promise(function (callback) {
    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.src = url;

    // Add iframe to body
    console.log("body")
    console.log(document.body);
    document.body.appendChild(iframe);

    // Timeout To Remove iframe
    if (timeout !== -1) {
      setTimeout(function () {
        iframe.remove();
      }, timeout || 2000);
    }

    // Add listener to iframe
    iframe.addEventListener("load", function (event) {
      // Get iframe's documentElement and clone it and get the innerHTML
      iframeSource = (event.target.contentDocument.documentElement || event.target.contentWindow.document.documentElement).cloneNode(true).innerHTML;

      // Remove iframe from DOM
      event.target.remove();

      if (fixKindleFormatting) {
        // (replace applies to a lot of file types, not just directory listings)
        iframeSource = iframeSource.replace('<head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">', '').replace('</pre></body>', '');
      }

      // Resolve promise
      callback(iframeSource);
    });
  });
}


function getDirectory(location) {
  return new Promise(function (callback) {
    // Get source of directory listing
    fetchFile(location).then(function (data) {
      // Create list
      var files = [
        {
          "name": "devtools",
          "path": "../apps/devtools"
        },
        {
          "name": "file browser",
          "path": "../apps/file browser"
        }
      ];

      callback(files); // Resolve promise
    });
  });
}

function joinPaths(path1, path2) {
  if (path1.slice(-1) == '/') {
    path1 = path1.slice(0, -1);
  }

  if (path2.slice(0,2) == './') {
    path2 = path2.slice(1);
  } else if (path2[0] != '/') {
    path2 = '/' + path2;
  }

  return path1 + path2;
}