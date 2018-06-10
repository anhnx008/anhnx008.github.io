$(document).ready(function(){

//Initialize the screen with a start button
function InitializeStartScreen()
{
    startScreenHtml = "<button id='startBtn'>START GAME</button>";
    $("#quizBox").html(startScreenHtml);
}

InitializeStartScreen();

//Global variables
var QuizObject = {
    questionArray: ["Q1. What built in method returns the length of the string in JavaScript?", 
                        "Q2. Which of the following function in JavaScript returns the position of the first occurence of a specified value in a string?", 
                        "Q3. Which of the following function in JavaScript converts a passed string to lower case letters?",
                        "Q4. Which of the following is the correct syntax to create a cookie uisng JavaScript?",
                        "Q5. Which of the following function removes the first element from an array and returns that element?",
                        "Q6. What does JSON stands for?",
                        "Q7. JSON name/value pair is written as?",
                        "Q8. What function will convert a Javascript object to a JSON string?",
                        "Q9. What does AJAX stands for?",
                        "Q10. What is AJAX based on?"],
    
    choicesArray:  [["length()", "size()", "index()", "count()"],
                        ["substr()", "search()", "lastIndexOf()", "indexOf()"],
                        ["toLocaleLowerCse()", "toLowerCase()", "toString()", "substring()"],
                        ["browser.cookie = 'key1 = value1; key2 = value2; expires = date';", "window.cookie = 'key1 = value1; key2 = value2; expires = date';", "document.cookie = 'key1 = value1; key2 = value2; expires = date';", "navigator.cookie = 'key1 = value1; key2 = value2; expires = date';"],
                        ["reverse()", "shift()", "slice()", "deleteFirst()"],
                        ["JavaScript Object Notation", "Java Object Notation", "JSON Object Name", "JavaScript Object Nomenclature"],
                        ["'name' = 'value'", "name = 'value'", "name = \"value\"", "\"name\" : \"value\""],
                        ["JSON.text()", "JSON.stringify()", "JSON.toString()", "JSON.serialize()"],
                        ["Asynchronous JavaScript and XML", "Abstract JSON and XML", "Another Java Abstraction for X-Windows", "Another Java and XML Library"],
                        ["JavaScript and Java", "JavaScript and XML", "VBScript and XML", "JavaScript and HTTP requests"]],
    
    answerArray:   ["A. length()", "D. indexOf()", "B. toLowerCase()", "C. document.cookie = 'key1 = value1; key2 = value2; expires = date';", "B. shift()", "A. JavaScript Object Notation", "D. \"name\" : \"value\"", "B. JSON.stringify()", "A. Asynchronous JavaScript and XML", "B. JavaScript and XML"],
    correctGIFArray: ["'assets/images/correctImg1.gif'", "'assets/images/correctImg2.gif'", "'assets/images/correctImg3.gif'", "'assets/images/correctImg4.gif'", "'assets/images/correctImg5.gif'", "'assets/images/correctImg6.gif'", "'assets/images/correctImg7.gif'", "'assets/images/correctImg8.gif'", "'assets/images/correctImg9.gif'", "'assets/images/correctImg10.gif'"],
    incorrectGIFArray: ["'assets/images/wrongImg1.gif'", "'assets/images/wrongImg2.gif'", "'assets/images/wrongImg3.gif'", "'assets/images/wrongImg4.gif'", "'assets/images/wrongImg5.gif'", "'assets/images/wrongImg6.gif'", "'assets/images/wrongImg7.gif'", "'assets/images/wrongImg8.gif'", "'assets/images/wrongImg9.gif'", "'assets/images/wrongImg10.gif'"],
    
    GenerateRandomImage: function(Imgarray){
        function getRandomInt(max) 
            {
            return Math.floor(Math.random() * Math.floor(max));
            }
            var newImg = Imgarray[getRandomInt(Imgarray.length)];       
            return newImg;
        }
    }
var imgForCorrectAns;
var imgForInccorrectAns;
var quizBoxHtml;
var questionTracker = 0;
var startScreenHtml
var timeOut = 30;
var timer;
var correctAnswers = 0;
var incorrectAnswer = 0;
var unAnswered = 0;
var totalQuestions = QuizObject.questionArray.length;
var clickSound = new Audio("assets/sound/ClickSound.mp3");
var successSound = new Audio("assets/sound/SuccessSound.wav");
var incorrectSound = new Audio("assets/sound/wrongSound.wav");
var tickSound = new Audio("assets/sound/Tick.mp3");
var timesUp = new Audio("assets/sound/Timesup.mp3");



//***Detect button start button click
$("#startBtn").on("click", function()
{
//Generate a quiz box for the questions and choices
renderQuizBox();

//Start timer to count down
startTimer();
})

//***Detect whether element with class 'choice' is clicked
$("body").on("click", ".choice", function(){
 
 clickSound.play();
 selectedChoice = $(this).text();
 if(selectedChoice === QuizObject.answerArray[questionTracker])
 {
     //Clear the timer
     clearInterval(timer);
     handleWin();
 }
 else
 {
     clearInterval(timer);
     handleLoss();
 }
})

//**Detect whether playAgain button is clicked */
$("body").on("click", "#playAgainBtn", function()
{
    resetGame();
})

//Helper Methods
function renderQuizBox(){
    quizBoxHtml = "<p class='time'>Time Remaining: <span class='time' id='timer'>30</span></p><br><p><span id='question'></span></p>" + QuizObject.questionArray[questionTracker] + "</p><br><p class='choice'>A. " + QuizObject.choicesArray[questionTracker][0] + "</p><p class='choice'>B. " + QuizObject.choicesArray[questionTracker][1] + "</p><p class='choice'>C. " +  QuizObject.choicesArray[questionTracker][2] + "</p><p class='choice'>D. " + QuizObject.choicesArray[questionTracker][3] + "</p>";
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
    quizBoxHtml = "<p class='message'>You Took Too Long! The correct answer is: </p><br>" + QuizObject.answerArray[questionTracker] + "<br><br><img src='assets/images/outOfTime.gif' width='480' height='300'></img>";
    $("#quizBox").html(quizBoxHtml);
    setTimeout(transitionToNextQuestion, 3000);
}

function handleWin(){
    successSound.play();
    correctAnswers++;
    imgForCorrectAns = QuizObject.GenerateRandomImage(QuizObject.correctGIFArray);
    quizBoxHtml= "<p class='message'>Correct!</p><br><img src=" + imgForCorrectAns + " width='450' height='300'></img>";
    $("#quizBox").html(quizBoxHtml);
    setTimeout(transitionToNextQuestion, 3000);
}

function handleLoss(){
    incorrectSound.play();
    incorrectAnswer++;
    imgForInccorrectAns = QuizObject.GenerateRandomImage(QuizObject.incorrectGIFArray);
    quizBoxHtml= "<p class='message'>Wrong! The correct answer is: </p><br>" + QuizObject.answerArray[questionTracker] + "<br><br><img src=" + imgForInccorrectAns + " width='480' height='300'></img>";
    $("#quizBox").html(quizBoxHtml);
    setTimeout(transitionToNextQuestion, 3000);
}

function resetGame(){
    timeOut = 30;
    correctAnswers = 0;
    incorrectAnswer = 0;
    unAnswered = 0;
    questionTracker = 0;
    renderQuizBox();
    startTimer();
}

function outputResult(){
    quizBoxHtml = "<div id='result-container'><br><p class='result'>Overall Scores</p><br><p class='result'>Correct Answers: " + correctAnswers + "</p><p class='result'>IncorrectAnswers: " + incorrectAnswer + "</p><p class='result'>Unanswered: " + unAnswered + "<br><br><br><button id='playAgainBtn'>Play Again</button></div>";
    $("#quizBox").html(quizBoxHtml);
}

})
























































