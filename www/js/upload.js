// File or Blob named mountains.jpg
function previewFile() {

    // var preview = document.querySelector('#preview');
    var files   = document.querySelector('input[type=file]').files;
  
    function readAndPreview(file) {
  
      // Make sure `file.name` matches our extensions criteria
      if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
        var reader = new FileReader();
  
        reader.addEventListener("load", function () {
          var image = new Image();
        //   image.height = 100;
        //   image.title = file.name;
        //   image.src = this.result;
        //   preview.appendChild( image );
          upload(file);
        }, false);
  
        reader.readAsDataURL(file);
      }
  
    }
  
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  
  }


// function previewFile() {
//     const preview = document.querySelector('img');
//     const file = document.querySelector('input[type=file]').files[0];
//     const reader = new FileReader();
  
//     reader.addEventListener("load", function () {
//       // convert image file to base64 string
//       upload(file);
//       preview.src = reader.result;
//     }, false);
  
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   }
// onOpen = function (event) {
//     var fileReader = new FileReader();
//     fileReader.onload = function (event) {
//         var ab = event.target.result;
//         console.log(ab);

//         upload(ab);
//         // var ua = new Uint8Array(ab);

//         // var binaryImg;
//         // for (var i = 0; i < ua.length; i++) {
//         //     binaryImg += String.fromCharCode(ua[i]);
//         // }
//         // var img64 = btoa(binaryImg);

//         // var image = new Image();
//         // image.src = 'data:image/png;base64,' + img64;

//         // var img = document.getElementById('img');
//         // img.src = image.src;
//     }
//     fileReader.readAsArrayBuffer("hello.jpg");
// };
var storageRef = firebase.storage().ref();
var db = firebase.firestore();
// onOpen();
// Create the file metadata
function upload(file) {
var metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;


    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    db.collection("images").doc('picturesurls').update({
        url: firebase.firestore.FieldValue.arrayUnion(downloadURL)
    })
  });
});
}

date="15th October 2019";
desc="My suprise visit to your place!";

// addDate(date,desc);

function addDate(dateV,descV) {
  db.collection("dates").doc("n").set({
   date: dateV,
   desc: descV
});
}


// addPoem(title3,poem3);

function addPoem(titleV,descV) {
  db.collection("poems").doc("3").set({
   title: titleV,
   desc: descV
});
}

