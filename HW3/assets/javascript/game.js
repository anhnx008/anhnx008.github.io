
//Global Variables
var currentword = "";

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
    word = this.WordsList[getRandomInt(this.WordsList.length)];
    return word;
    },

    DisplayDashes: function(str){
       wordlength = str.length;
       var tempstr = "";

       for(i = 0; i < wordlength; i++)
       {
         tempstr += " _ ";
       }
       document.getElementById("display-correct-letters").innerHTML = tempstr;
    },
}

//Variables for stats
var Wins = 0;
var Losses = 0;
var RemainingGuesses = 9;

//Array to keep track of Guessed Letters
var GuessedLetters = [];


//Listen to spacebar event to start
document.onkeyup = function(e){
    if(e.keyCode == 13)
    {
        //Generate new word
        currentword = HangmanWord.GenerateCurrentWord();
        HangmanWord.DisplayDashes(currentword);
    }
}

