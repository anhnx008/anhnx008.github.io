var word = require("./Word");
var inquirer = require("inquirer");

var wordList = ["astronomy","physics", "nebular", "galaxy",
                "bolide","craters","jansky","kepler", "planets",
                "meteor","parallax","quasar","protostar","pulsar",
                "solar","neutrino","photon","supernova","umbra",
                "ultraviolet","telescope","stellar","star","solstice"];

function generateRandomWord(array){
    randomWord = Math.floor(Math.random()*(array.length));
    return randomWord;
}