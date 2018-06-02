$(document).ready(function() {

//Global variable
var randomNumber = 0;
var greenGemNum = 0;
var redGemNum = 0;
var yellowGemNum = 0;
var blueGemNum = 0;
var sum = 0;
var Wins = 0;
var Losses = 0;
var continueGame = false;

//Listen to ENTER event to start
$(document).keyup(function(e){

    //When the Enter button is pressed
    if(e.keyCode == 13)
    {
        SetGame();

        //If user click on the green gem then add its number to the sum
        $("#greenGem").on("click", function()
        {   
            if(sum < randomNumber)
            {
                sum = sum + greenGemNum;
                $("#currentTotalDisplay").text(sum);
            }
            if(sum === randomNumber)
            {
                $("#message").text("You Win!");
                Wins++;
                $("#win-count").text(Wins);
                SetGame();
            }
            if((sum > randomNumber) && (continueGame === true))
            {
                $("#message").text("You Lost!");
                Losses++;
                $("#loss-count").text(Losses);
                continueGame = false;
                SetGame();
            }
        })

       //If user click on the red gem then add its number to the sum
       $("#redGem").on("click", function()
       {
        if(sum < randomNumber)
        {
            sum = sum + redGemNum;
            $("#currentTotalDisplay").text(sum);
        }
        if(sum === randomNumber)
        {
            $("#message").text("You Win!");
            Wins++;
            $("#win-count").text(Wins);
            SetGame();
        }
        if((sum > randomNumber) && (continueGame === true))
        {
            $("#message").text("You Lost!");
            Losses++;
            $("#loss-count").text(Losses);
            continueGame = false;
            SetGame();
        }
       })

       //If user click on the yellow gem then add its number to the sum
       $("#yellowGem").on("click", function()
       {
        if(sum < randomNumber)
        {
            sum = sum + yellowGemNum;
            $("#currentTotalDisplay").text(sum);
        }
        if(sum === randomNumber)
        {
            $("#message").text("You Win!");
            Wins++;
            $("#win-count").text(Wins);
            SetGame();
        }
        if((sum > randomNumber) && (continueGame === true))
        {
            $("#message").text("You Lost!");
            Losses++;
            $("#loss-count").text(Losses);
            continueGame = false;
            SetGame();
        }
       })

       //If user click on the blue gem then add its number to the sum
       $("#blueGem").on("click", function()
       {
        if(sum < randomNumber)
        {
            sum = sum + blueGemNum;
            $("#currentTotalDisplay").text(sum);
        }
        if(sum === randomNumber)
        {
            $("#message").text("You Win!");
            Wins++;
            $("#win-count").text(Wins);
            SetGame();
        }
        if((sum > randomNumber) && (continueGame === true))
        {
            $("#message").text("You Lost!");
            Losses++;
            $("#loss-count").text(Losses);
            continueGame = false;
            SetGame();
        }
       })

    }
})


//Helper methods

//Function to generate a random number between a range
function GenerateRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SetGame()
{
    continueGame = true;
    sum = 0;

    //Set the sum back to zero
    $("#currentTotalDisplay").text("");

    //Generate a random number for user
    randomNumber = GenerateRandomInt(19,120);
    $("#randomNumberDisplay").text(randomNumber);

    //Generate random number for each of the gem
    greenGemNum = GenerateRandomInt(1,12);
    redGemNum = GenerateRandomInt(1,12);
    yellowGemNum = GenerateRandomInt(1,12);
    blueGemNum = GenerateRandomInt(1,12);
}

})

