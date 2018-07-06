$(document).ready(function(){

//Initialize the AOS library
AOS.init();


//Listen to event's click for slide show
$(".prev").on("click", function(){
    plusSlides(-1);
})

$(".next").on("click", function(){
    plusSlides(1);
})

$(".dot").on("click", function(){

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