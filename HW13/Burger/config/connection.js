//Setup mySQL connection
var mysql = require("mysql");

// if(process.env.JAWSDB_URL){
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// }
// else{
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "",
//     database: "burgers_db"
// });
// };

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burgers_db"
});

//Make a connection
connection.connect(function(error){
    if(error) throw error;

    console.log("Connected as id: " + connection.threadId);
});

module.exports = connection;