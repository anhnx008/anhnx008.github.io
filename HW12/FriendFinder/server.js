//Aquire packages
var express = require("express");
var bodyParser = require("body-parser");


//Create an express server
var app = express();
var PORT = process.env.PORT || 8080;

//Set up express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Handling routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Start server
app.listen(PORT, function(){
    console.log("App is listening on PORT: " + PORT);
});