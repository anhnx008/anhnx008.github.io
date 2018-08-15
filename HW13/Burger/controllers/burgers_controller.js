var burger = require("../models/burger");
var express = require("express");

var router = express.Router();

//Create routes and how to handle them

//Get all the burgers
router.get("/", function(req, res) {
    burger.all(function(result) {
      var handleBarObject = {
        burgers: result
      };
      //Render the handlebar object in the index.html
      res.render("index", handleBarObject);
    });
  });

  //Add new burger to the list
  router.post("/api/burgers", function(req, res) {
    burger.create(
        ["burger_name", "devoured"], 
        [req.body.burger_name, false], 
        
        function(result) {
      res.redirect("/");
    });
  });

  //Update the burger (status of whether the burger has been eaten or not)
  router.put("/api/burgers/:id", function(req, res) {
    burger.update(req.params.id, function() {
      res.redirect("/");
    });
  });

  module.exports = router;