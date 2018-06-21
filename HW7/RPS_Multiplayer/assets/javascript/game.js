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
    var whoamI = "";

    //jQuery selectors
    var nameFromInputField = $("#name-input");


    //******Helper Methods************

    //Hide choices and stats
    function initialScreen() {
        $(".player1Btn").hide();
        $(".player2Btn").hide();
        $(".score").hide();
    }

    function welcomePlayer() {
        if (whoamI === "player1") {
            $("#announcement-display").text("Hi " + player1.name + " ! " + "You are player 1.");
            $("#playBtn").hide();
            $("#name-input").hide();
        }
        else if (whoamI === "player2") {
            $("#p2Score").show();
            $("#announcement-display").text("Hi " + player2.name + " ! " + "You are player 2.");
            $("#playBtn").hide();
            $("#name-input").hide();
        }
        else {
            $("#playBtn").hide();
            $("#name-input").hide();
        }

    }
    //*****End Helper Method Section**************



    //MAIN BODY OF GAME/////////////////////////////////////////////////////////////////////////////////////

    //Hide all the choices and score stats at the begining 
    initialScreen();

    //Listening to for PLAY BUTTON's click event - grab user's name from name input box
    $("#playBtn").on("click", function (event) {
        event.preventDefault();

        playerTurn = 1;
        currentPlayer = $(this).attr("player");  //grab the player attribute of on the Play button

        //Get the name entered by user. Verify something was entered and not blank
        if (nameFromInputField.val().length <= 0) {
            $("#announcement-display").text("Please enter your name first to begin");
        }
        else {

            if (currentPlayer === "player1") {
                player1.name = nameFromInputField.val().trim();

                //Update firebase database with the new info
                database.ref().update({
                    p1Name: player1.name,
                    p1Wins: player1.win,
                    p1Losses: player1.loss,
                    playerTurn: playerTurn
                })
                whoamI = "player1";
                welcomePlayer();
            }
            else if (currentPlayer === "player2") {
                player2.name = nameFromInputField.val().trim();

                //Update firebase database with the new info
                database.ref().update({
                    p2Name: player2.name,
                    p2Wins: player2.win,
                    p2Losses: player2.loss,
                    playerTurn: playerTurn
                })
                whoamI = "player2";
                welcomePlayer();
            }
        }

    });

    //Ongoing - listening to database's changes
    database.ref().on("value", function (snapshot) {

        //If player 1 has entered a name then show their name and score
        if (snapshot.val().p1Name !== undefined) {
            $("#p1Score").show();
            $("#player1Name").text(snapshot.val().p1Name);
            $("#win-count1").text(snapshot.val().p1Wins);
            $("#loss-count1").text(snapshot.val().p1Losses);
        }

        //If player 2 has entered a name then show their name and score
        if (snapshot.val().p2Name !== undefined) {
            $("#p2Score").show();
            $("#player2Name").text(snapshot.val().p2Name);
            $("#win-count2").text(snapshot.val().p2Wins);
            $("#loss-count2").text(snapshot.val().p2Losse);
        }

        //If both players have entered their name then begin game
        if ((snapshot.val().p1Name !== undefined) && (snapshot.val().p2Name !== undefined)) {
            
            //Player 1's turn
            if (snapshot.val().playerTurn === 1) 
            {
                if (whoamI === "player1") {
                    $(".player1Btn").show();
                    $("#announcement-display").text("Select your choice");
                    console.log(snapshot.val().playerTurn);
                    console.log(whoamI);
                }

                else {
                    $("#announcement-display").text("Waiting for player 1 to choose");
                    $(".player1Btn").hide();
                    $(".player2Btn").hide();
                }
            }

            //Player 2's turn
            else if (snapshot.val().playerTurn === 2) 
            {
                if (whoamI === "player2") 
                {
                    $(".player2Btn").show();
                    $("#announcement-display").text("Select your choice");
                }
            
                else {
                    $("#announcement-display").text("Waiting for player 2 to choose");
                    $(".player1Btn").hide();
                    $(".player2Btn").hide();
                }
            }
        }

        //If NO players defined in database then new user will be player 1
        if ((whoamI === "") && (snapshot.val().p1Name === undefined)) {
            //Set the player attribute of the Play button to player 1
            $("#playBtn").attr("player", "player1")
        }
        // If player 1 exists the new user will be player 2
        else if (whoamI === "" && (snapshot.val().p2Name === undefined)) {
            //Set the player attribute of the Play button to player2
            $("#playBtn").attr("player", "player2")
        }
        //If both spots are taken then anyone joining a spectators
        else if (whoamI === "") {
            $("#announcement-display").text("There is currently no available spot. But stay and watch!");
        }

    }, function(errorObject) {
        console.log("Error handled " + errorObject.code);
    });

    //Listening to SEND CHAT button's click event
    $("#sendBtn").on("click", function (event) {
        event.preventDefault();

        //Get message from input field
        var chatMsg = $("#input-message").val().trim();
        var senderName = "";

        if (whoamI === "player1") {
            senderName = player1.name;
        }
        else if (whoamI === "player2") {
            senderName = player2.name;
        }
        else {
            senderName = "Spectator";
        }

        //Push message up to firebase 
        chatData.push({
            senderName: senderName,
            isPlayer: whoamI,
            chatMsg: chatMsg,
        });

        //Clear the input message box
        $("#input-message").val("");
    })

    //Listen for any new changes in the chat database, get and display in chat
    chatData.on("child_added", function (chatSnapshot) {
        var chatMsg = chatSnapshot.val().chatMsg;
        var senderName = chatSnapshot.val().senderName;
        var isPlayer = chatSnapshot.val().isPlayer;
        var newLi = $("<li>");
        console.log('new li is: ', newLi)
        if (isPlayer === "player1") {
            newLi.addClass("p1Sender");
            newLi.text(senderName + ": " + chatMsg + "\r\n");
            $("#messages").append(newLi);
        }
        else if (isPlayer === "player2") {
            newLi.addClass("p2Sender");
            newLi.text(senderName + ": " + chatMsg + "\r\n");
            $("#messages").append(newLi);
        }
        else {
            newLi.addClass("nonPlayerSender");
            newLi.text(senderName + ": " + chatMsg + "\r\n");
            $("#messages").append(newLi);
        }
    })
});




