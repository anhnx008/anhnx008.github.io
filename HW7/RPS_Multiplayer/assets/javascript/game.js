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
    var database = firebase.database().ref("PlayerInfo");
    var chatData = firebase.database().ref("chatData");

    var chatMsgChild = chatData.child("chatData/chatMsg");

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
        $(".player1Btn").css("visibility","hidden");
        $(".player2Btn").css("visibility","hidden");
        $(".score").css("visibility","hidden");
    }

    //Display welcome message and let user knows which player they are. Hide the input name field and the play button once they have entered their name
    function welcomePlayer() {
        if (whoamI === "player1") {
            $("#p1Score").css("visibility","visible");
            $("#announcement-display").text("Hi " + player1.name + " ! " + "You are player 1.");
            $("#playBtn").hide();
            $("#name-input").hide();
        }
        else if (whoamI === "player2") {
            $("#p2Score").css("visibility","visible");
            $("#announcement-display").text("Hi " + player2.name + " ! " + "You are player 2.");
            $("#playBtn").hide();
            $("#name-input").hide();
        }
        else if(whoamI === ""){
            $("#playBtn").hide();
            $("#name-input").hide();
        }

    }

    function determineWinner(choice1, choice2)
    {      
        if ((choice1 === choice2) || (choice1 === choice2) || (choice1 === choice2)) 
        {
            //A draw
            return "tie";
        }
        else if ((choice1 === "r" && choice2 === "s") || (choice1 === "p" && choice2 === "r") || (choice1 === "s" && choice2 === "p"))
        {
            //Player 1 wins
            return "player1";
        }
        else if ((choice2 === "r" && choice1 === "s") || (choice2 === "p" && choice1 === "r") || (choice2 === "s" && choice1 === "p"))
        {
            //Player 2 wins
            return "player2";
        }
    }

    function resetTurn(){
        playerTurn = 1;

        $("#announcement-display").text("");

        database.update({
            playerTurn: playerTurn
        })

    }

    function displaySelection(selection , playerNum)
    {     
        if(selection === "r"){
            $("#rockBtn" + playerNum).css("visibility", "visible");
            $("#paperBtn" + playerNum).css("visibility", "hidden");
            $("#scissorBtn" + playerNum).css("visibility", "hidden");
        }
        if (selection === "p")
        {
            $("#paperBtn" + playerNum).css("visibility", "visible");
            $("#rockBtn" + playerNum).css("visibility", "hidden");
            $("#scissorBtn" + playerNum).css("visibility", "hidden");
        }
        if (selection === "s")
        {
            $("#scissorBtn" + playerNum).css("visibility", "visible");
            $("#paperBtn" + playerNum).css("visibility", "hidden");
            $("#rockBtn" + playerNum).css("visibility", "hidden");
        }

    }
    //*****End Helper Method Section**************





    //MAIN BODY OF GAME/////////////////////////////////////////////////////////////////////////////////////

    //Hide all the choices and score stats at the begining 
    initialScreen();

    //Listening to for PLAY BUTTON's click event - grab user's name from name input field
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

                //Update firebase database with player 1's info
                database.update({
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

                //Update firebase database with player 2's info
                database.update({
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

    //***********************ONGOING - LISTENING TO CHANGE IN DATABASE*********************
    database.on("value", function(snapshot) {

        if(snapshot.val().playerTurn !== undefined) {
    		playerTurn = snapshot.val().playerTurn;
    	}
    	// If the database doesn't know whose turn it is, create it
    	else {
    		database.update({
    			playerTurn: 1
    		});
    	}

        //If player 1 has entered a name then show their name and score
        if (snapshot.val().p1Name !== undefined) {
            $("#p1Score").css("visibility", "visible");
            $("#player1Name").text(snapshot.val().p1Name);
            $("#win-count1").text(snapshot.val().p1Wins);
            $("#loss-count1").text(snapshot.val().p1Losses);
        }

        //If player 2 has entered a name then show their name and score
        if (snapshot.val().p2Name !== undefined) {
            $("#p2Score").css("visibility", "visible");
            $("#player2Name").text(snapshot.val().p2Name);
            $("#win-count2").text(snapshot.val().p2Wins);
            $("#loss-count2").text(snapshot.val().p2Losses);
        }

        //If both players have entered their name then begin game
        if ((snapshot.val().p1Name !== undefined) && (snapshot.val().p2Name !== undefined)) 
        {
            
            //And it is player 1's turn
            if (snapshot.val().playerTurn === 1) 
            {
                if (whoamI === "player1") 
                {
                    $(".player1Btn").css("visibility", "visible");
                    $("#announcement-display").text(snapshot.val().p1Name + ", it is your turn. Please make your selection");
                }

                else 
                {
                    $("#announcement-display").text("Waiting for player 1 to choose...");
                    $(".player2Btn").css("visibility", "hidden");
                }
            }

            //And it is player 2's turn
            else if (snapshot.val().playerTurn === 2) 
            {
                if (whoamI === "player2") 
                {
                    $(".player2Btn").css("visibility", "visible");
                    $("#announcement-display").text(snapshot.val().p2Name + ", it is your turn. Please make your selection");
                }
            
                else 
                {
                    $("#announcement-display").text("Waiting for player 2 to choose...");
                    $(".player1Btn").css("visibility", "hidden");
                }
            }

            //This means that both players have already made their selections
            else if(snapshot.val().playerTurn === 0)
            {
                player1.rpsSelection = snapshot.val().p1choice;
                player2.rpsSelection = snapshot.val().p2choice;


                var winner = determineWinner(player1.rpsSelection, player2.rpsSelection);

                if(winner === "player1")
                {
                    player1.win = snapshot.val().p1Wins;
                    player1.name = snapshot.val().p1Name;
                    player1.win++;
                    player2.loss = snapshot.val().p2Losses;
                    player2.loss++;
                    playerTurn = 3;

                    $("#announcement-display").text(player1.name + " is the winner in this round!");            

                    database.update({
                        p1Wins: player1.win,
                        p2Losses: player2.loss,
                        playerTurn: playerTurn
                    })
                }

                else if(winner === "player2")
                {
                    player2.win = snapshot.val().p2Wins;
                    player2.name = snapshot.val().p2Name;
                    player2.win++;
                    player1.loss = snapshot.val().p1Losses;
                    player1.loss++;
                    playerTurn = 3; //This is to temporarily prevent the program from continuously execute the condition where playerTurn equals to 0

                    $("#announcement-display").text(player2.name + " is the winner in this round!");

                    database.update({
                        p2Wins: player2.win,
                        p1Losses: player1.loss,
                        playerTurn: playerTurn
                    })
                }
                else if(winner === "tie")
                {
                    $("#announcement-display").text("It's a tie!");
                }
                setTimeout(resetTurn, 4500);
            }              
        }
        
        //If NO players defined in database then new user will be player 1
        if ((whoamI === "") && (snapshot.val().p1Name === undefined)) 
        {
            //Set the "player" attribute of the Play button to player 1
            $("#playBtn").attr("player", "player1")
        }
        // If player 1 exists the new user will be player 2
        else if (whoamI === "" && (snapshot.val().p2Name === undefined)) 
        {
            //Set the "player" attribute of the Play button to player2
            $("#playBtn").attr("player", "player2")
        }
        //If both spots are taken then anyone joining is a spectator
        else if (whoamI === "") 
        {
            $("#announcement-display").text("There is currently no available spot. But stay and watch!");
            $("#playBtn").hide();
            $("#name-input").hide();
        }

    }, function(errorObject) {
        console.log("Error handled " + errorObject.code);
    });



    //Listen to the click event for ROCK, PAPER, SCISSOR BUTTONS
    $(".player1Btn , .player2Btn").on("click", function(){

        var selection = $(this).attr("data-value");

        if(playerTurn === 1)
        {
            playerTurn = 2;

            //Push to database
            database.update({
                p1choice : selection,
                playerTurn: playerTurn
            });

            displaySelection(selection, "1");

        }

        else if(playerTurn === 2)
        {
            playerTurn = 0; 

            //Push to database
            database.update({
                p2choice : selection,
                playerTurn: playerTurn
            });

            displaySelection(selection, "2");
        }     
    });

       //******************CHAT FUNCTIONALITY*************************************** */
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
    });

    //ONGOING - Listening for any new changes in the chat database, get and display in chat
    chatData.on("child_added", function (chatSnapshot) {
        var chatMsg = chatSnapshot.val().chatMsg;
        var senderName = chatSnapshot.val().senderName;
        var isPlayer = chatSnapshot.val().isPlayer;
        var newLi = $("<li>");

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
    });
})

 


