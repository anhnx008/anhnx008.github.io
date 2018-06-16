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

console.log("Starting");

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
console.log(newAnimal);
renderButton();
})

//Click event for each animal button. Make an ajax call to the api
$(".animal-button").on("click", function(){

   var animal = $(this).attr("data-buttonName");
   queryURL = baseURL + queryParam + animal + limitParam + apiKey;
   console.log(queryURL);

   $.ajax({
       url: queryURL,
       method: 'GET'
   }).then(function(response){
     
    var result = response.data;
    // console.log(result);
    console.log(result.length);

    for(i = 0; i < result.length; i++)
    {
        //Get the rating, url for still image and gif 
        var rating = result[i].rating;
        console.log(rating);
        var imgSrcAnimate = result[i].images.fixed_height.url;
        var imgSrcStill = result[i].images.fixed_height_still.url; 
        // console.log(imgSrcAnimate);
        // console.log(imgSrcStill);

        //Create new <img> and <p> elements
        var newImgDiv = $("<img>");
        var newP = $("<p>");

        //Add class and attributes to the image element
        newImgDiv.addClass("gif");
        newImgDiv.attr("src", imgSrcStill);
        newImgDiv.attr("data-still", imgSrcStill);
        newImgDiv.attr("data-animate", imgSrcAnimate);
        newImgDiv.attr("data-state", "still");

        //Append to html
        newP.text("Rating: " + rating);
        $("#gifs-display").append(newP);
        $("#gifs-display").append(newImgDiv);
    }
   })

})

//Click event when user click on image
$("body").on("click", ".gif", function(){

console.log("CLICKED IMAGE");
//Get the data-state attribute of the image
var state = $(this).attr("data-state");
console.log(state);

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