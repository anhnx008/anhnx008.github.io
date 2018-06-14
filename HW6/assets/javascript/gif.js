$(document).ready(function(){

//Global variables
topics = ["cat", "dog", "bird", "fish", "koala", "dolphin"];
var count = 10;
var newAnimal;
var queryURL

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

//Click event for each animal button
{

}


});