//Global Variables
var currentword = "";
var guessedLetters = [];
var Wins = 0;
var Losses = 0;
var remainingGuesses = 10;
var continueGame = false;
var progressArray = [];

//Set up audio elements
var audioSuccess = new Audio("assets/sound/SuccessSound.wav");
var audioGameOver = new Audio("assets/sound/GameOverSound.wav");

//Hangman object
var HangmanWord = {
    WordsList: ["astronomy","physics", "nebular", "galaxy",
                "bolide","craters","jansky","kepler", "planets",
                "meteor","parallax","quasar","protostar","pulsar",
                "solar","neutrino","photon","supernova","umbra",
                "ultraviolet","telescope","stellar","star","solstice"],
         
    GenerateCurrentWord: function(){
    function getRandomInt(max) 
        {
        return Math.floor(Math.random() * Math.floor(max));
        }
        var newword = this.WordsList[getRandomInt(this.WordsList.length)];       
        return newword;
    }
};

//**********Helper Methods*********
//Create and return empty dashes array for the current word
function CreateDashes(word)
{
    var dashesArray = [];
    for(i = 0; i < word.length; i++)
    {   
        dashesArray[i] = "_";
    }    
    return dashesArray;
}

//Display progress
function DisplayProgress(id, array)
{
    document.getElementById(id).innerHTML = array.join(" ");
}

//Check if user's guess is in the word
function UpdateProgress(guess, word, tempArray, guessedLetters)
{
    var letterExist = false;

    function CheckGuess()
    {
        //Iterate through the each letter in the word and see if the user's guess matches 
        for(var i = 0; i < word.length; i++)
        {
            if(word[i] === guess)
            {
                tempArray[i] = guess;       
                DisplayProgress("display-correct-letters", tempArray);
                console.log("tempArray is: " + tempArray);
                letterExist = true;
            }
        }
        return letterExist;
    }

    if(CheckGuess() === false)
    {
        //If user guessed the a letter that is not in the word more than once then don't log it and also don't need to subtract remaining guess
        if(!guessedLetters.includes(guess))
        {
            guessedLetters.push(guess);
            remainingGuesses--;
            document.getElementById("remaining-guess-count").innerHTML = remainingGuesses;
            
        }
         
        document.getElementById("guessed-letters").innerHTML =  guessedLetters.join(" ");   
    }
}

//Function to clear content 
function setContent(elementID, input)
{
    document.getElementById(elementID).innerHTML = input;
}

//Function to setup game
function setGame()
{
    //Generate new word and display available guesses
    remainingGuesses = 10;
    document.getElementById("remaining-guess-count").innerHTML = remainingGuesses;
    guessedLetters = [];
    setContent("guessed-letters", "");
    currentword = HangmanWord.GenerateCurrentWord();
    console.log(currentword);
    progressArray = CreateDashes(currentword);
    console.log(progressArray);
    DisplayProgress("display-correct-letters", progressArray);
    continueGame = true;
}

//Function to reset game
function resetGame()
{
    setContent("display-correct-letters", "");
    setContent("Announcement", "");
    setContent("guessed-letters", "");
    setContent("remaining-guess-count", 10);
    setContent("win-count", 0);
    Wins = 0;
    Losses = 0;
    remainingGuesses = 10;
    guessedLetters = [];
    currentword = "";
    continueGame = false;
}

//Listen to spacebar event to start game
document.onkeyup = function(e){
    if(e.keyCode == 13)
    {
        // //Reset the stats 
        // resetGame();
        
        //Set game
        setGame();

        //Wait for user guess
        document.onkeyup = function(event) 
        {
            //Check if key entered is a letter  
            if((event.keyCode >= 65) && (event.keyCode <= 90) && (continueGame))
             {
                var userGuess = event.key;
                
                //Check if user has any guess remaining
                if(remainingGuesses == 0)
                {
                    audioGameOver.play();
                    document.getElementById("Announcement").innerHTML = "GAME OVER! &#x1f625";
                    continueGame = false;                   
                }
                else if(remainingGuesses > 0)
                {
                    UpdateProgress(userGuess.toLocaleLowerCase(), currentword, progressArray, guessedLetters);
                    
                    //When user guessed the entire word correctly
                    if(!progressArray.includes("_")){
                        Wins++;
                        document.getElementById("Announcement").innerHTML = "YOU GOT IT! &#128125";
                        document.getElementById("win-count").innerHTML = Wins;
                        audioSuccess.play();
                        continueGame = false;
                        setGame();                                       
                    }                   
                }               
             }
             
             //If user press Esc then reset game
             if(event.keyCode == 27)
             {
                resetGame();              
             }
        }
    }
};