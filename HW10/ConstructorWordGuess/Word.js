var Letter = require("./Letter");

function Word(word){

    this.word = word;
    this.letterArray = [];

    //Create an array of Letter objects for the passed in word
    makeLetterArray = function()
    {
        var stringArray = this.word.split("");
        for(var i = 0; i < stringArray; i++){
            this.letterArray.push(new Letter(stringArray[i]));
        }
    }
}

module.exports = Word;