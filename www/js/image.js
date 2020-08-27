var fileSystem;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // console.log(cordova.file);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        var fileSystem;
        // console.log('file system open: ' + fs.name);
        fileSystem = fs;
        getSampleFile(fs.root);
        // fileread(fs.root,"downloadedImage.png");

}, onErrorLoadFs);
}

function readFile(url) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        // console.log("Calling file read");
        fileread(fs.root,url);
    }, onErrorLoadFs);
}

function fileread(dirEntry, url) {
    var fileName = url.substring(
        url.lastIndexOf("%") + 1, 
        url.lastIndexOf("?")
    );
// var fileName = url.substring(url.lastIndexOf('/')+1)+".jpeg";
dirEntry.getFile(fileName, { create: false, exclusive: false }, function (fileEntry) {
    // console.log("Getting file : "+fileName);
    readBinaryFile(fileEntry,dirEntry,url);
}, ()=>onErrorCreateFile(dirEntry,url));
}

function onErrorLoadFs(){
  console.log("Error occured");
}

// 'https://cordova.apache.org/static/img/cordova_bot.png'
function getSampleFile(dirEntry,url) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET',url, true);
  xhr.responseType = 'blob';

  xhr.onload = function() {
      if (this.status == 200) {
        //   console.log("Received file from : "+url);
          var blob = new Blob([this.response], { type: 'image/png' });
        //   console.log("Calling save file");
          
        //   var filename = url.substring(url.lastIndexOf('/')+1)
            // console.log("filename :" +filename);
          saveFile(dirEntry, blob, url);
      }
  };
//   console.log("Sending request for "+url);
  xhr.send();
}

function saveFile(dirEntry, fileData, url) {
    var fileName = url.substring(
            url.lastIndexOf("%") + 1, 
            url.lastIndexOf("?")
        );
    // console.log("Saving file : "+fileName);
  dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

      writeFile(fileEntry, fileData,url);

  }, onErrorWriteFile);
}

function onErrorWriteFile(){
    console.log("Error writingg file");
}
function onErrorCreateFile(dirEntry,url){
  console.log("File error on create "+url);
    getSampleFile(dirEntry,url);
}

function writeFile(fileEntry, dataObj, url,isAppend) {

  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function() {
        //   console.log("Successful file write...");
          if (dataObj.type == "image/png") {
              readBinaryFile(fileEntry,null,url);
          }
          else {
              readFile(fileEntry);
          }
      };

      fileWriter.onerror = function(e) {
          console.log("Failed file write: " + e.toString());
      };

      fileWriter.write(dataObj);
  });
}

function readBinaryFile(fileEntry,dirEntry,url) {
  fileEntry.file(function (file) {
      var reader = new FileReader();

      reader.onloadend = function() {

        //   console.log("Successful file write: " + this.result);
          // displayFileData(fileEntry.fullPath + ": " + this.result);

          var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
          displayImage(blob,url);
      };

      reader.readAsArrayBuffer(file);

  }, ()=>onErrorReadFile(dirEntry,url));
}

function onErrorReadFile(dirEntry,url){
  console.log("Error reading file");
  getSampleFile(dirEntry,url);
}
function displayImage(blob,url) {
    var id = url.substring(
        url.lastIndexOf("%")+1,
        url.lastIndexOf(".")
        );
        // Displays image if result is a valid DOM string for an image.
    // console.log("image downloaded : id "+id);
var elem = document.getElementById(id);
// Note: Use window.URL.revokeObjectURL when finished with image.
elem.src = window.URL.createObjectURL(blob);
}
function displayImageByFileURL(fileEntry) {
//   console.log("displaying image");
  var elem = document.getElementById('logo');
  elem.src = fileEntry.toURL();
}