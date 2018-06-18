$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCByOuDQrWL1lz3fvnbEDGGIwgcnGcq4w4",
        authDomain: "rock-paper-scissor-f26a1.firebaseapp.com",
        databaseURL: "https://rock-paper-scissor-f26a1.firebaseio.com",
        projectId: "rock-paper-scissor-f26a1",
        storageBucket: "",
        messagingSenderId: "302275638088"
    };
    firebase.initializeApp(config);

    //Global variables
    var database = firebase.database();
    var chatData = database.ref("chatData");
    var connectionData = database.ref("connectionData");

    var player1 = {
        name: "",
        win: 0,
        loss: 0,
        rpsSelection: ""
    }

    var player2 = {
        name: "",
        win: 0,
        loss: 0,
        rpsSelection: ""
    }

    var playerTurn = 1;

    //jQuery selectors
    var nameFromInputField = $("#name-input");

    //******Helper Methods************
  


    //Start button is clicked - grab user's name from input box
    $("#startBtn").on("click", function(event){
        event.preventDefault();

        //Get the name entered by user
        if(nameFromInputField.val().length <= 0){
            $("#announcement-display").text("Please enter your name first to begin");
        }
        else{
            player1.name = nameFromInputField.val().trim();
            $("#announcement-display").text("Hi " + player1.name + "! " + "You are player 1. Waiting for a new opponent...");
            $("#player1Name").text(player1.name);
            console.log(player1.name);

            //Update firebase database with the new info
            // database.ref().update({
            //     player1Name: player1.name,
            //     player1Wins: player1.win,
            //     player1Losses: player1.loss
            // })

        }
        
    })
})





