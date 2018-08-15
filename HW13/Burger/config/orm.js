// Import mySQL connection to query database call
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }


//Object for all of the query functions
var orm = {

    selectAll: function(table, callbackFunction){

        //mySQL query for all burger's name from burger table
        var queryString = "SELECT * FROM " + table;
        console.log("Query string for selectAll: " + queryString);
        connection.query(queryString, function(error, result){
            if(error) throw error;

            callbackFunction(result);
        })
    },

    insertOne: function(table, column, itemToInsert, callbackFunction){

        //mySQL query to insert a new burger into the burger table
        var queryString = "INSERT INTO " + table + " (" + column.toString() + ") VALUES (" + printQuestionMarks(itemToInsert.length) + ")";

        console.log("Query String for inserting: " + queryString);
        connection.query(queryString, itemToInsert, function(error, result){
            if(error) throw error;

            callbackFunction(result);
        });
    },

    updateOne: function(table, burgerId, callbackFunction){
        var queryString = "UPDATE " + table + " SET ? WHERE ?";

        console.log("Query string for updateOne: " + queryString);
        connection.query(queryString, [{devoured: true}, {id: burgerId}], function(error, result){
            if(error) throw error;

            callbackFunction(result);
        })
    }
}

module.exports = orm;