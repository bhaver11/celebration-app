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

title="Perfect"
poem= "When I noticed you the first time,<br>my mind asked, \"Is she perfect?\"<br>"+
      "The way you are working hard <br> away from your home, <br> makes you <b>perfect</b>. <br> <br>"+
      "When I saw you the first time <br> my eyes asked, \"Is she perfect?\"<br>"+
      "The innocence in your smile and the way your eyes shine, <br> makes you <b>perfect</b><br><br>"+
      "Listening to you the first time <br>got me thinking, \"Is she perfect?\"<br>"+
      "The way you put soul in the words you sing<br>and the cuteness your accent brings<br>"+
      "makes you <b>perfect</b><br><br>"+
      "When I met you the first time<br>my heart asked, \"Is she perfect?\"<br>The way time flies when I am with you<br>"+
      "and how we can talk for eternity<br>You make me happy in a way nobody else can<br>And how this paragraph has no rhyme<br>and still you are smiling<br>"+
      "Makes you <b>Perfect</b>"
title2="I saw you today"
poem2="I saw you today, I saw your smile.<br>"+
"I saw your smile, I wish was mine. <br>"+
"I saw you today, I saw your eyes. <br>"+
"I saw your eyes, where your dream lies. <br>"+
"I saw you today, I saw you happy and I pray. <br>"+
"I pray that this happiness stays. <br>"+
"I saw you today, I saw you blush. <br>"+
"I saw you blush, I said to time \"please do not rush!\"<br>"+  
"I am lucky to have spent those moments with you which I would never forget. <br>"+
"I saw you today, it's your exam tomorrow, I know you are a little stuck but, <br>"+
"Trust yourself always. I wish you a very good luck :)<br>"
// addPoem(title,poem2);

var title3="Hazar Panne";
var poem3="Mai likhna chahta hun hazar panne<br>"+
"Hazar panne tumhare liye. <br>"+
"Kaise ye kahani shuru hui, <br>"+
"Hamari dosti, aur phir mera pyaar tumhare liye. <br>"+
"Kal tak toh tum anjan the, <br>"+
"Kal tak tum bas ek khwab the <br>"+
"Aaj mera har khwab Hai bas tumhare liye. <br>"+
"Mai likhna chahta hun hazar panne, <br>"+
"Hazar panne  tumhare liye. <br><br>"+

"Kaise tumhari pyari batein mujhe apna bana gai <br>"+
"Kaise meri ankhen tumse mili aur unme tum bas gai sada ke liye. <br>"+
"Kal tak toh tumhari sirf jhalak dikhti thi<br>"+
"Aaj har pal tum mere samne ho, bas aakhen band karne ki deri hai mere liye <br>"+
"Mai likhna chahta hun hazar panne, hazar panne  tumhare liye. <br><br>"+

"Shayad mai waisa nahi jaisa tumne socha tha apne khwabon mein, <br>"+
"Par tumhara har khwab pura ho yahi hai khushi ab mere liye. <br>"+
"Kal tak tumhe chup chup ke suna karta tha , <br>"+
"Ab har pal iss dil ko bas tumhari aahat ka intezar rehta hai. <br>"+
"Mai likhna chahta hun hazar panne, <br>"+
"Hazar panne tumhare liye.<br><br>"+
"Shayad tumhe pana bohot mushkil hai , <br>"+
"Jo lagti hai pass , shayad durr woh manzil hai. <br>"+
"Tumhe pane se zyada tumhari khushi chahta hun mai<br>"+
"Kal tak toh tumhare chehre ke noor se pyaar tha<br>"+
"Par aaj tumhari dil ki khoobsurti ko chahta hun mai. <br>"+
"Mai likhna chahta hun hazar panne,<br>"+
"Hazar panne tumhare liye. <br><br>"+
"Aur jab woh hazar panne khatam ho jae, <br>"+
"Agle panne se firse likhna shuru kar dunga tumhare liye. <br>"+
"Kyuki baat jab tumhari ho, hazar panne bhi kum hai mere liye. <br>"+
"Mai likhna chahta hun hazar panne, <br>"+
"Hazar panne tumhare liye."
title4="A message"
poem4="I can never forget the time when my eyes used to search for you, just to get a glimpse of you. <br>"+
"When my heart longed to talk to you, but could never gain courage to do so. <br>"+
"When I wished to be near you somehow. <br>"+
"When I day dreamed about us. <br>"+
"I can never forget the time when my soul could feel the good vibes coming in from you. <br>"+
"There was something about you, which made me want to know you more. <br>"+
"When you were still a dream, which was too good to come true. <br>"+
"But maybe my prayers reached the universe. <br>"+
"And now when you are here, with me. Closer than anyone else. <br>"+
"I want to say that I will never take this for granted<br>"+
"Because your love was not a competition to be won, <br>"+
"it's a gem to be preserved. <br>"+
"I feel lucky to be loved by you. <br>"+
"I love you infinity."

// addPoem(title3,poem3);

function addPoem(titleV,descV) {
  db.collection("poems").doc("3").set({
   title: titleV,
   desc: descV
});
}

