$(document).ready(function(){

//Initialize the screen with a start button
function InitializeStartScreen()
{
    startScreenHtml = "<button id='startBtn'>START GAME</button>";
    $("#quizBox").html(startScreenHtml);
}

InitializeStartScreen();

//Global variables
var quizBoxHtml;
var questionTracker = 0;
var startScreenHtml
var timeOut = 30;
var timer;
var correctAnswers = 0;
var incorrectAnswer = 0;
var unAnswered = 0;
var clickSound = new Audio("assets/sound/ClickSound.mp3");
var successSound = new Audio("assets/sound/SuccessSound.wav");
var incorrectSound = new Audio("assets/sound/wrongSound.wav");
var tickSound = new Audio("assets/sound/Tick.mp3");
var timesUp = new Audio("assets/sound/Timesup.mp3");
var questionArray = ["Q1. What built in method returns the length of the string in JavaScript?", 
                    "Q2. Which of the following function in JavaScript returns the position of the first occurence of a specified value in a string?", 
                    "Q3. Which of the following function in JavaScript converts a passed sttring to lower case letters?",
                    "Q4. Which of the following is the correct syntax to create a cookie uisng JavaScript?",
                    "Q5. Which of the following function removes the first element from an array and returns that element?",
                    "Q6. What does JSON stands for?",
                    "Q7. JSON name/value pair is written as?",
                    "Q8. What function will convert a Javascript object to a JSON string?",
                    "Q9. What does AJAX stands for?",
                    "Q10. What is AJAX based on?"];

var choicesArray = [["length()", "size()", "index()", "count()"],
                    ["substr()", "search()", "lastIndexOf()", "indexOf()"],
                    ["toLocaleLowerCse()", "toLowerCase()", "toString()", "substring()"],
                    ["browser.cookie = 'key1 = value1; key2 = value2; expires = date';", "window.cookie = 'key1 = value1; key2 = value2; expires = date';", "document.cookie = 'key1 = value1; key2 = value2; expires = date';", "navigator.cookie = 'key1 = value1; key2 = value2; expires = date';"],
                    ["reverse()", "shift()", "slice()", "deleteFirst()"],
                    ["JavaScript Object Notation", "Java Object Notation", "JSON Object Name", "JavaScript Object Nomenclature"],
                    ["'name' = 'value'", "name = 'value'", "name = \"value\"", "\"name\" : \"value\""],
                    ["JSON.text()", "JSON.stringify()", "JSON.toString()", "JSON.serialize()"],
                    ["Asynchronous JavaScript and XML", "Abstract JSON and XML", "Another Java Abstraction for X-Windows", "Another Java and XML Library"],
                    ["JavaScript and Java", "JavaScript and XML", "VBScript and XML", "JavaScript and HTTP requests"]]

var answerArray = ["A. length()", "D. indexOf()", "B. toLowerCase()", "C. document.cookie = 'key1 = value1; key2 = value2; expires = date';", "B. shift()", "A. JavaScript Object Notation", "D. \"name\" : \"value\"", "B. JSON.stringify()", "A.  Asynchronous JavaScript and XML", "C. JavaScript and Java"];
var totalQuestions = questionArray.length;

//Detect button start button click
$("#startBtn").on("click", function()
{
//Generate a quiz box for the questions and choices
renderQuizBox();

//Start timer to count down
startTimer();
})

//Detect whether element with class 'choice' is clicked
$("body").on("click", ".choice", function(){
 
 clickSound.play();
 selectedChoice = $(this).text();
 console.log(selectedChoice);
 console.log(answerArray[questionTracker]);
 if(selectedChoice === answerArray[questionTracker])
 {
     //Clear the timer
     clearInterval(timer);
     console.log("Correct");
     handleWin();
 }
 else
 {
     clearInterval(timer);
     console.log("Wrong");
     handleLoss();
 }
})

//Helper Methods
function renderQuizBox(){
    quizBoxHtml = "<p class='time'>Time Remaining: <span class='time' id='timer'>30</span></p><br><p><span id='question'></span></p>" + questionArray[questionTracker] + "</p><br><p class='choice'>A. " + choicesArray[questionTracker][0] + "</p><p class='choice'>B. " + choicesArray[questionTracker][1] + "</p><p class='choice'>C. " +  choicesArray[questionTracker][2] + "</p><p class='choice'>D. " + choicesArray[questionTracker][3] + "</p>";
    $("#quizBox").html(quizBoxHtml);

}

function startTimer(){
    //Call countdown function every 1 second
    timer = setInterval(countDown, 1000);

    function countDown()
    {
        //Check if timer has reach 0. If it has reached 0 then clear timer and display correct answer
        if(timeOut === 0){
            clearInterval(timer);
            handleLossDueToTimeout();
        }
        if(timeOut > 0)
        {
            //Keep counting down the time
            tickSound.play()
            timeOut--;
        }
        $("#timer").text(timeOut);
    }
}

function transitionToNextQuestion()
{
    if(questionTracker < (totalQuestions - 1)){
        questionTracker++;
        console.log("Question Number: " + questionTracker);
        console.log("Total questions: "+ totalQuestions);
        renderQuizBox();
        timeOut = 30;
        startTimer();
    }
    else{
        outputResult();   
    }
}

function handleLossDueToTimeout(){
    timesUp.play();
    unAnswered++;
    quizBoxHtml = "<p class='message'>You Took Too Long! The correct answer is: </p><br>" + answerArray[questionTracker] + "<br><br><img src='assets/images/outOfTime.gif' width='450' height='300'></img>";
    $("#quizBox").html(quizBoxHtml);
    setTimeout(transitionToNextQuestion, 3500);
}

function handleWin(){
    successSound.play();
    correctAnswers++;
    quizBoxHtml= "<p class='message'>Correct!</p><br><img src='assets/images/correctImg1.gif' width='450' height='300'></img>";
    $("#quizBox").html(quizBoxHtml);
    setTimeout(transitionToNextQuestion, 3500);
}

function handleLoss(){
    incorrectSound.play();
    incorrectAnswer++;
    quizBoxHtml= "<p class='message'>Wrong! The correct answer is: </p><br>" + answerArray[questionTracker] + "<br><br><img src='assets/images/wrongImg1.gif' width='450' height='300'></img>";
    $("#quizBox").html(quizBoxHtml);
    setTimeout(transitionToNextQuestion, 3500);
}

function resetGame(){
    timeOut = 30;
    correctAnswers = 0;
    incorrectAnswer = 0;
    unAnswered = 0;
}

function outputResult(){
    quizBoxHtml = "<p class='result'>Overall Scores</p><br><br><p class='result'>Correct Answers: " + correctAnswers + "</p><p class='result'>IncorrectAnswers: " + incorrectAnswer + "</p><p class='result'>Unanswered: " + unAnswered;
    $("#quizBox").html(quizBoxHtml);
}

})
























































