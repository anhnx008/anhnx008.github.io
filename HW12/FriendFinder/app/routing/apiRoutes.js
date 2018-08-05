var friendData = require("../data/friend.js");
var totalQuestions = 10; //Total number of questions
var minScore = 1; //Strongly disagree corresponds to 1
var maxScore = 5; //Strong agree corresponds to 5
var maxDiff = (maxScore - minScore) * totalQuestions;

//Routing/Handling the API post and get request methods
module.exports = function(app){

    //API GET requests- returns friendData (from friend.js)
    app.get("/api/friend", function(req, res){
        res.json(friendData);
    });

    //API POST requests- take in new user's data and return most compatible match
    app.post("/api/friend", function(req, res){

        var newUser = req.body;
        

        //If there at least one other friend in the friend.js (friendData) then compare
        if(friendData.length > 1)
        {

            var minDiff = {diff: maxDiff, name:"name", photo:"photo"}; //This is to hold info for potential candidate
            var bestMatches = [];

            friendData.forEach(existingUser => 
            {
                var  totalDiff = 0;
                
                //Loop through the score from the questionaire and find the total difference
                for(var i = 0; i < newUser.scores.length; i++)
                {
                    totalDiff += Math.abs(newUser.scores[i] - existingUser.scores[i]);
                }

                //If the totalDiff is a smaller value then minDiff with it and set corresponding name and photo
                //This means there is a better match so take that value
                if(totalDiff < minDiff.diff)
                {
                    //Get potential candidate info
                    minDiff.diff = totalDiff;
                    minDiff.name = existingUser.name;
                    minDiff.photo = existingUser.photo;

                    //Clear old bestMatches info and push in the better matched client's info
                    bestMatches.length = 0;
                    bestMatches.push(minDiff);
                    
                }
                //If there are multiple compatible friends with same score then push them to bestMatches array
                else if(totalDiff === minDiff.diff){

                    //Get potential candidate info
                    var sameDiffCandidate = {};
                    sameDiffCandidate.diff = totalDiff;
                    sameDiffCandidate.name = existingUser.name;
                    sameDiffCandidate.photo = existingUser.photo;
                    
                    bestMatches.push(sameDiffCandidate);
                   
                }
            });  
            
            //Send the bestMatches to the client
            res.json(bestMatches);
            console.log("BestMatches(s) array: ")
            console.log(bestMatches);
        }

        else{
            //If there is only one person in the database then just send that person's info back
            res.json(friendData);
        }

        //Push new client's data to friend.js (friendData)
        friendData.push(newUser);
        
    })
}