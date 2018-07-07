$(document).ready(function(){

//Initialize the AOS library
AOS.init();

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD0OkicZZ--3ktgGy-022L5XP9UkmsiVbk",
    authDomain: "portfolio-a5932.firebaseapp.com",
    databaseURL: "https://portfolio-a5932.firebaseio.com",
    projectId: "portfolio-a5932",
    storageBucket: "portfolio-a5932.appspot.com",
    messagingSenderId: "989668262433"
  };
  firebase.initializeApp(config);

  var database = firebase.database().ref("ContactInfo");



  //When user's click send in contact form
  $("#sendBtn").on("click", function(event)
{
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var email = $("#email-input").val().trim();
    var message = $("#message-input").val().trim();

    database.push({
        Name: name,
        Email: email,
        Message: message,
    })

    //Clear all input fields after user submit
    $("#name-input").val("");
    $("#email-input").val("");
    $("#message-input").val("");
})

//Listen to event's click for slide show
$(".prev").on("click", function(event){
    event.preventDefault();
    plusSlides(-1);
})

$(".next").on("click", function(event){
    event.preventDefault();
    plusSlides(1);
})

$(".dot").on("click", function(event){
    event.preventDefault();
    currentSlideNum = $(this).attr("value");
    currentSlide(currentSlideNum);
})


//For slide shows
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = $(".bio-section-slide");
  var dots = $(".dot");
  
  if (n > slides.length) {
      slideIndex = 1
    } 
  if (n < 1) {
      slideIndex = slides.length
    }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}





});