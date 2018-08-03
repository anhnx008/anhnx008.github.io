var friendData = require("../data/friend.js");

//Routing

module.exports = function(app){

    //API GET requests- returns friendData (from friend.js)
    api.get("/api/friend", function(req, res){
        res.json(friendData);
    });

    //API POST requests- take in new user's data and return most compatible match
    app.post("api/friend", function(req, res){

        var newUser = req.body;

        //If there at least one other friend in the friend.js (friendData) then compare
        if(friendData.length > 1)
        {

            var minDiff = ["41", "name", "photo"]; //40 is the max possible difference
            var bestMatches = [];

            friendData.forEach(existingUser => 
            {
                var  totalDiff = 0;
                
                //Loop through the score from the questionaire and find the total difference
                for(var i = 0; i < questionnaireAnswer.length; i++)
                {
                    totalDiff += Math.abs(newUser.score[i] - existingUser.score[i]);
                }

                //If the totalDiff is a smaller value then minDiff with it and set corresponding name and photo
                //This means there is a better match so take that value
                if(totalDiff < minDiff[0])
                {
                    //Get potential candidate info
                    minDiff[0] = totalDifference;
                    minDiff[1] = existingUser.name;
                    minDiff[2] =existingUser.photo;

                    //Clear old bestMatches info and push in the better matched client's info
                    bestMatches.length = 0;
                    bestMatches.push(minDiff);
                }
                //If there are multiple compatible friends with same score then push them to bestMatches array
                else if(totalDiff === minDiff[0]){

                    //Get potential candidate info
                    minDiff[0] = totalDifference;
                    minDiff[1] = existingUser.name;
                    minDiff[2] =existingUser.photo;
                    
                    bestMatches.push(minDiff);
                }

            });  
            
            //Send the bestMatches to the client
            res.json(bestMatches);
        }
        else{
            //If there is only one person in the database then just send that person's info back
            res.json(friendData);
        }

        //Push new client's data to friend.js (friendData)
        friendData.push(req.body);
        
    })
}