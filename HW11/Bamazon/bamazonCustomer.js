var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");
var totalCost = 0;

//Create an connection object
var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "root",
database: "bamazon"
});

//Connect to the database
connection.connect(function(error){

if(error) throw error;
console.log("Connected successfully as id " + connection.threadId);

viewProducts();
})

//Display table of items for sale and ask customer what they want to purchase and how many
function viewProducts(){
    //Query to select from the products table
    connection.query("SELECT * FROM products", function(error, response){
        if(error) throw error;

        var table = new Table({
            style: {head : ['green']},
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        });

        //Loop through and push the items from the query into the table
        for(var i = 0; i < response.length; i++){
            table.push(
                [response[i].item_id, response[i].product_name, response[i].department_name, "$ " + response[i].price, response[i].stock_quantity]
            )
        }
        //Print out the table
        console.log(table.toString() + "\n");

        purchaseRequest(); 
    })
}

function purchaseRequest(){
    inquirer.prompt
([
    {
        name: "itemID",
        message: "Please enter the ID of the product you would like to purchase? ",
        validate: function(value){
            if(isNaN(value) === false && parseInt(value) > 0 && Number.isInteger(parseFloat(value)))
                {return true;}
            else 
                {return false;}
        }       
    },

    {
        name: "unit",
        message: "How many units of the product would you like to purchase? ",
        validate: function(value){
            if(isNaN(value) === false && Number.isInteger(parseFloat(value)))
            {return true;}
        else 
            {return false;}
        }
    }
]).then(answer => {

    //Check whether selected item (based on item_id) meets the quantity requested. 
    connection.query("SELECT * FROM products WHERE item_id=?", [answer.itemID], function(error, response){
        if(error) throw error;

        if(answer.unit > response[0].stock_quantity)
        {
            console.log("We currently do not have that many units available in stock");
            continueShoppingPrompt();
        }
        else
        {
            //Update inventory 
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: (response[0].stock_quantity - answer.unit)},{item_id: answer.itemID}]);

            //Calculate total cost
            totalCost = totalCost + (response[0].price * answer.unit);
            console.log("Thank you for your purchase, your total is: $ " + totalCost.toFixed(2));
            continueShoppingPrompt();
        }
    })   
});
}

//Ask if customer wants to continue shopping after making a purchase
function continueShoppingPrompt(){
    inquirer.prompt([
        {        
        name: "continueShopping",
        type: "list",
        message: "Would you like to continue shopping?",
        choices: ["Yes", "No"]
        }
    ]).then(answer => {
        if(answer.continueShopping === "Yes")
        {
            viewProducts();
        }
        else if(answer.continueShopping === "No"){
            console.log("THANK YOU FOR YOUR PURCHASE!");
            connection.end();
        }
    })
}