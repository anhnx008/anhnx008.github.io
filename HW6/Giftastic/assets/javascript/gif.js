$(document).ready(function(){

//Global variables
topics = ["cat", "dog", "bird", "fish", "koala", "dolphin"];
var count = 10;
var newAnimal;

var baseURL = "https://api.giphy.com/v1/gifs/search?"
var queryParam = "q=";
var limitParam = "&limit=10"; //number of records to return (10)
var apiKey = "&api_key=dc6zaTOxFJmzC";
var queryURL = "";

//Loop through the array and make button for each item in the array
function renderButton() 
{
    $("#buttons-display").empty();
    for(i = 0; i < topics.length; i++)
    {
        //Create a dynamic button
        var newBtn = $("<button>");
        //Set class and attribute for button
        newBtn.addClass("animal-button");
        newBtn.attr("data-buttonName", topics[i]);
        //Set button's name
        newBtn.text(topics[i]);
        $("#buttons-display").append(newBtn);
    }
}

renderButton();

//Click event for Submit button
$("#submitBtn").on("click", function(event){

event.preventDefault();

//When the submit button is click, push the new item user entered into the array
newAnimal = $("#userInput").val().trim();
topics.push(newAnimal);
renderButton();
})

//Click event for each animal button. Make an ajax call to the api
$("body").on("click", ".animal-button", function(){

   var animal = $(this).attr("data-buttonName");
   queryURL = baseURL + queryParam + animal + limitParam + apiKey;

   $.ajax({
       url: queryURL,
       method: 'GET'
   }).then(function(response){
     
    var result = response.data;

    //Clear existing images first
    $("#gifs-display").text("");

    for(i = 0; i < result.length; i++)
    {
        //Get the rating, url for still image and gif 
        var rating = result[i].rating;
        var imgSrcAnimate = result[i].images.fixed_height.url;
        var imgSrcStill = result[i].images.fixed_height_still.url; 

        //Create new <img> and <p> elements
        var newImgDiv = $("<img>");
        var newP = $("<p>");
        var newGifDiv = $("<div>");

        //Add class and attributes to the image 
        newGifDiv.addClass("gif-container");
        newImgDiv.addClass("gif");
        newImgDiv.attr("src", imgSrcStill);
        newImgDiv.attr("data-still", imgSrcStill);
        newImgDiv.attr("data-animate", imgSrcAnimate);
        newImgDiv.attr("data-state", "still");

        //Append to html
        newP.html("<p>Rating: " + rating + "</p><br>");
        newGifDiv.append(newP);
        newGifDiv.append(newImgDiv);
        $("#gifs-display").append(newGifDiv);
    }
   })

})

//Click event when user click on image
$("body").on("click", ".gif", function(){

//Get the data-state attribute of the image
var state = $(this).attr("data-state");

if (state === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
}
else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still")
}

})
});