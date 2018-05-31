//Global Variables
var currentword = "";
var guessedLetters = [];
var Wins = 0;
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

//Function to clear content 
function setContent(elementID, input)
{
    document.getElementById(elementID).innerHTML = input;
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
            setContent("remaining-guess-count", remainingGuesses);          
        }        
        setContent("guessed-letters", guessedLetters.join(" "));
    }
}

//Function to setup game
function setGame()
{
    //Set remaining guess and clear out guessed letter section
    remainingGuesses = 10;
    setContent("remaining-guess-count", remainingGuesses);
    guessedLetters = [];
    setContent("guessed-letters", "");

    //Generate new word and 
    currentword = HangmanWord.GenerateCurrentWord();
    progressArray = CreateDashes(currentword);
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
//****************************/


//Listen to Enter event to start game
document.onkeyup = function(e){
    if(e.keyCode == 13)
    {
        //Set game
        setGame();

        //Wait for user guess
        document.onkeyup = function(event) 
        {
            //Check if key entered is a letter  
            if((event.keyCode >= 65) && (event.keyCode <= 90) && (continueGame))
             {
                var userGuess = event.key;
                               
               if(remainingGuesses > 0)
                {
                    UpdateProgress(userGuess.toLocaleLowerCase(), currentword, progressArray, guessedLetters);
                    
                    //When user guessed the entire word correctly
                    if(!progressArray.includes("_")){
                        Wins++;
                        setContent("Announcement", "YOU GOT IT! &#128125");
                        setContent("Instruction", "KEEP GOING!");
                        setContent("win-count", Wins);
                        audioSuccess.play();
                        continueGame = false;
                        setGame();                                       
                    }                   
                }
                
                //Check if user has any guess remaining
                if(remainingGuesses == 0)
                {
                    audioGameOver.play();
                    setContent("Announcement", "GAME OVER! &#x1f625");
                    setContent("Instruction", "Press F5 to restart the game");
                    setContent("display-correct-word", "Correct Word is: " + currentword);
                    continueGame = false;               
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