var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override')

var PORT = process.env.PORT || 8080;

var app = express();

//This was needed because my PUT method call did not work without this
app.use(methodOverride("_method"))

// Server static content for the app from "public" directory
app.use(express.static(__dirname + "/public"));

//Configure parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set handlebars
var exphandleBars = require("express-handlebars");
app.engine("handlebars", exphandleBars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Import routes and give server access to use them
var routes = require("./controllers/burgers_controller");

app.use(routes);

//Start the server and listen for client requests
app.listen(PORT, function() {

    console.log("Server listening on: http://localhost:" + PORT);
});