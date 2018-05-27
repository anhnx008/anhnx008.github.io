$(document).ready(function() {

//Global Variables
var currentword = "";
var guessedLetters = [];
var Wins = 0;
var Losses = 0;
var remainingGuesses = 10;

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

//Helper Methods*********

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

//Display
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
        remainingGuesses--;
        document.getElementById("remaining-guess-count").innerHTML = remainingGuesses;
        guessedLetters.push(guess); 
        document.getElementById("guessed-letters").innerHTML =  guessedLetters.join(" ");     
    }

    console.log(guessedLetters);
    
      
}

//Listen to spacebar event to start
console.log("Starting game");

document.onkeyup = function(e){
    if(e.keyCode == 13)
    {
        //Generate new word
        var currentword = HangmanWord.GenerateCurrentWord();
        console.log(currentword);
        var progressArray = CreateDashes(currentword);
        console.log(progressArray);
        DisplayProgress("display-correct-letters", progressArray);

        //Wait for user guess
        document.onkeyup = function(event) 
        {
          //Check if key entered is a letter  
          if((event.keyCode >= 65) && (event.keyCode <= 90))
          {
          var userGuess = event.key;
          UpdateProgress(userGuess.toLocaleLowerCase(), currentword, progressArray, guessedLetters);
          }       
        }  
    }
  

}
});