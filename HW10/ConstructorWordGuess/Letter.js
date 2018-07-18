//Constructor for creating Letter object
function Letter(letter)
{
    this.letter = letter;
    this.isGuessed = false;

    //Return the underlying letter if it has been guessed or return underscore if letter has not been guessed
    this.displayLetter = function(){
        if(this.isGuessed){
            return this.letter;
        }
        else{
            console.log("_");
        }
    }

    //If guess equals to the letter then set the boolean to true
    this.checkGuess = function(guess){
        if(this.letter.toLowerCase() === guess.toLowerCase()){
            this.isGuessed = true;
        }
    }
}

module.exports = Letter;