$(document).ready(function(){

//Initialize the screen with a start button
function InitializeStartScreen()
{
    quizBoxHtml = "<button id='startBtn'>START GAME</button>";
    $("#quizBox").html(quizBoxHtml);
}

InitializeStartScreen();

//Global variables
var quizBoxHtml;
var timeOut = 30;
var timer;
var CorrectAnswers = 0;
var IncorrectAnswer = 0;
var unAnswered = 0;
var questionArray = ["What built in method returns the length of the string in JavaScript?", 
                    "Which of the following function in JavaScript returns the position of the first occurence of a specified value in a string?", 
                    "Which of the following function in JavaScript converts a passed sttring to lower case letters?",
                    "Which of the following is the correct syntax to create a cookie uisng JavaScript?",
                    "Which of the following function removes the first element from an array and returns that element?",
                    "What does JSON stands for?",
                    "JSON name/value pair is written as?",
                    "What function will convert a Javascript object to a JSON string?",
                    "What does AJAX stands for?",
                    "What is AJAX based on?"];
var choicesArray = [["A. length()", "B. size()", "C. size()", "D. count()"],
                    ["A. substr()", "B. search()", "C. lastIndexOf()", "D. indexOf()"],
                    ["A. toLocaleLowerCse()", "B. toLowerCase()", "C. toString()", "D. substring()"],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ]


//Detect button start button click

$("#startBtn").on("click", function()
{
//Generate a quiz box for the questions and choices
renderQuizBox();

//Start timer to count down
startTimer();
})

//Helper Methods
function renderQuizBox(){
    quizBoxHtml = "";
    

}

function startTimer(){
    //Call countdown function every 1 second
    timer = setInterval(countDown, 1000);

    function countDown()
    {
        //Check if timer has reach 0. If it has reached 0 then reset timer and display correct answer
        if(timeOut === 0){
            clearInterval(timer);
            handleLossDueToTimeout();
        }
        if(timeOut > 0)
        {
            //Keep counting down the time
            timeOut--;
        }
    }
}

function handleLossDueToTimeout(){
    unAnswered++;
    quizBoxHtml = "";
    $("#quizBox").html(quizBoxHtml);
}

function resetGame(){
    timeOut = 30;
    CorrectAnswers = 0;
    IncorrectAnswer = 0;
    unAnswered = 0;
}

})
























































