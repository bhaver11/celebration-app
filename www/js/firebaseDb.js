var storage = firebase.storage();
// var starsRef = storage.ref().child('pictures/bodhitree_fc5.png');
var urlArray;
var db = firebase.firestore();


// console.log("Calling")

// function checkPassword(password) {
//   firebase.auth().signInWithEmailAndPassword("a@b.com", password).catch(function(error) {
//     // Handle Errors here.
//     console.log(error)
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });
//  firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.

//     var email = user.email;
//     console.log('email : ' + email)
//     loadDashBoard();
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
// });
// }
// 




function getImageUrls(type) {
  // console.log("calling get image")
    db.collection("images").doc(type+"urls").get()
    .then(function(doc) {
        var imageArray = [];
        // console.log(doc.data()['url']);
        doc.data()['url'].forEach(url => {
          if(url!="")
            imageArray.push(url);
        
        });
        // console.log(imageArray);
        displayImages(imageArray,type);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
// getTextData("dates");
function getTextData(type) {
  var textData = [];
  db.collection(type).get()
  .then(querySnapshot => {
    querySnapshot.docs.forEach(doc => {
    textData.push(doc.data());
    // console.log(doc.data());
    displayTextData(textData,type);
  });})
}
var saveData = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (blob, fileName) {
      // var json = JSON.stringify(data),
          // blob = new Blob([json], {type: "octet/stream"}),
          url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
  };
}());


// Get the download URL
// starsRef.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
//   $("#test").attr("src",url);
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// url = proxyurl + url;
    // var xhr = new XMLHttpRequest();
    //     xhr.responseType = 'blob';
    //     xhr.onload = function(event) {
    //       var blob = xhr.response;
    //       console.log(blob);
    //       console.log("Blob received");
    //       saveData(blob,"/1.png");
    //     };
    //     xhr.open('GET', url);
    //     xhr.send();
    //     // save
      
  // urlArray.push(url);
  // console.log(url);
// }).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  // switch (error.code) {
    // case 'storage/object-not-found':
      // File doesn't exist
      // break;

    // case 'storage/unauthorized':
      // User doesn't have permission to access the object
      // break;

    // case 'storage/canceled':
      // User canceled the upload
      // break;


    // case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      // break;
  // }
// });

// window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

  // console.log('file system open: ' + fs.name);
  // getSampleFile(fs.root);
// 
// }, onErrorLoadFs);
