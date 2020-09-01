/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
};

app.initialize();

function goBack() {
    window.location = "#dashboard"
}

$(document).ready(function() {
    $('.back-button').click(goBack);
    $(window).on('hashchange', function(){
        loadPage(); //trigger page load on back-button
    }); 
    // window.location = "#messages"
    $(".videoDisplay").on("click", function(){
        if(!$.browser.mozilla) {
        // mozilla HTML5 video auto-supports auto click-to-play
        // otherwise we add this functionality ourselves
        if(this.paused == true) {
            this.play();
        } else {
            this.pause();
        }
        } // end mozilla browser check
    }); // end video click handler
});

function enterPassword() {
    $('#loginButton').hide();
    $('#password').show().focus();
    input = document.getElementById('password');
    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        if(input.value.length!=0) { 
            event.preventDefault();
            if(checkPassword(input.value)){
                loadDashBoard();
            }else {
                $('#info').show().html("Incorrect Password");
            }
        }else {
            $('#info').show()
            $('#info').html("Enter Password first!");
        }
    }else {
        if(input.value.length!=0){
            $('#info').hide();
        }
    }
  });
}

//Not used currently
function checkPassword(password) {
    if(password=="august")
        return true;
    else
        return false;
}

var page='login-parent';
function loadDashBoard(){
    $('.login-parent').hide(250);
    $('.dashboard').slideDown(250); 
    window.location = "#dashboard"
}

function loadPage() {
    lastPage = page;
    page = window.location.href.toString().split("#")[1];
    console.log("Last page: "+lastPage+"Curr page: "+page);
    if(lastPage=="dashboard" && page == undefined){
        navigator.app.exitApp();
    }
    if(page) {
        
        if(lastPage)
            $("."+lastPage).slideUp(500);
        $("."+page).slideDown(500);
    }
    if(page=='dashboard' || page=='login-parent')
        $('.back-button').hide(500);
    else
        $('.back-button').show();
    if(page=='sketch'){
        $('.imageDisplay').attr('src','img/sketch.jpeg')
    }
    if(page=="pictures")
        getImageUrls("farewell");
    if(page=='picture-display') {
        $('body').css('background-image','');
    }
    if(lastPage=='video'){
        $('#birthday-wishes').get(0).pause()
    }
    if(page=='video'){
        $('#birthday-wishes').get(0).play()
    }
    else
        $('body').css('background-image',"url('img/background_vertical.jpg')");        

}

function playVideo() {
     VideoPlayer.play("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
}

var pictureHTMLprefix=
"<a href='#picture-display' class='custom-card' style='width: 50%; height: 50%'>"+
    "<div class='card col-sm-6 picture-card' style='height: 250px'>"+
        "<img class='card-img-top'  style='width: 100%;max-height: 100%;padding: 0'";
var pictureHTMLsuffix=
">"+
    "</div>"+
"</a>"
var cardHTMLprefix=
"<div class='card' style='width: 90%;padding: 5%;margin:auto;margin-bottom: 3%;''>"+
            "<div class='card-body'>"+
              "<h4 class='card-title'>";
var cardHTMLmid=
"</h4><p class='card-text' style='font-size: large;'>"
var cardHTMLend=
"</p></div></div>"

function displayTextData(textData,type) {
    $(".loadingIcon"+type).hide();
    $("."+type+"-row").html('');
    textData.forEach(dataMap => {
        var titleKey = type=="dates"?"date":"from"
        $("."+type+"-row").append(cardHTMLprefix+dataMap[titleKey]+cardHTMLmid+dataMap['desc']+cardHTMLend);
    })
}

function displayImages(imageArray,type){
    type = "pictures"
    var classCount=1;
    // console.log("displaying images");
    // console.log(imageArray);
    $("#loadingIcon"+type).hide();
    // $(".pictures-row").html('');
    imageArray.forEach(url => {
        // console.log("hello");
        var id = url.substring(
            url.lastIndexOf("%") + 1, 
            url.lastIndexOf(".")
        );
        if($("#"+id).length){

        }else {
            // console.log("Adding id="+id);
            $(".pictures-row-"+type).append(pictureHTMLprefix+"src='"+url+"' id='"+id+"' onclick='displayPicture(this)'"+pictureHTMLsuffix);   
            $("#"+id).addClass(type+"pic_"+classCount);
            // readFile(url);
        }
        classCount++;
    });
}

function displayPicture(el) {
    // console.log($(el).attr('class').split(" ")[1]);
    $(".imageDisplay").attr("src",$(el).attr("src")); 
    $(".imageDisplay").attr("id",$(el).attr('class').split(" ")[1])
}

function changePicture(inc) {
    // console.log("change picture called with inc : "+inc);
    if(page=="picture-display"){
        curId=$(".imageDisplay").attr('id');
        curprefix=curId.split("_")[0];
        curNum = curId.split("_")[1];
        // console.log("curNum = "+curNum);
        curNum = Number(curNum) + Number(inc);
        // console.log("New num = "+curNum);
        // console.log(curprefix+curNum);
        displayPicture($("."+curprefix+"_"+curNum));
    }
}