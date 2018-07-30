var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2")

//Create a connection object
var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "root",
database: "bamazon"
});

//Connect to database
connection.connect(function(error){
    if(error) throw error;
    console.log("Connected successfully as id " + connection.threadId);

    displayOptions();
});

function displayOptions()
{
    inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "MAIN MENU- Select an option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }
    ]).then(answer => {

        switch(answer.option)
        {
            case "View Products for Sale":
            //Print every available item: the item IDs, names, prices, and quantities.
            viewProducts();
            break;

            case "View Low Inventory":
            //Print all items with an inventory count lower than five
            viewLowInventory();
            break;

            case "Add to Inventory":
            //Display a prompt that will let the manager "add more" of any item currently in the store
            addToInventory();
            break;

            case "Add New Product":
            //Add a completely new product to the store
            addNewProducts();
            break;

            case "Quit":
            //Quit
            Quit();
            break;
        }
    })
}

function viewProducts(){

    connection.query("SELECT * FROM products", function(error, response){
        if(error) throw error;

        var table = new Table({
            style: {head: ["green"]},
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        });

        for(var i = 0; i < response.length; i++){
            table.push(
                [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
            )
        }
        console.log("Items available for sale");
        console.log(table.toString() + "\n");

        displayOptions();
    });
}

function viewLowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(error, response){
        if(error) throw error;   

        var table = new Table({
            style: {head: ["red"]},
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        });

        for(var i = 0; i < response.length; i++){
            table.push(
                [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
            )
        }
        console.log("The follow items are low in quantities, less than five units are in stock");
        console.log(table.toString() + "\n");

        displayOptions();
    });
}

function addToInventory(){
    inquirer.prompt([
        {
            name: "itemID",
            message: "Which item do you want to stock? Enter the itemID",
            validate: function(value){
                if(isNaN(value) === false && parseInt(value) > 0 && Number.isInteger(parseFloat(value)))
                    {return true;}
                else 
                    {return false;}
            }
        },

        {
            name: "unit",
            message: "How many units would you like to add?",
            validate: function(value){
                if(isNaN(value) === false && Number.isInteger(parseFloat(value)))
                {return true;}
            else 
                {return false;}
            }
        }
    ]).then(answer => {

        //Query the specified item (based on itemID)
        connection.query("SELECT * FROM products WHERE item_id=?", [answer.itemID], function(error, response){
            if(error) throw error;

            //Update the inventory
            else{
                var totalQuantity = parseInt(response[0].stock_quantity) + parseInt(answer.unit);
                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: totalQuantity}, {item_id: answer.itemID}]);
                console.log(answer.unit + " units has been updated for item " + answer.itemID);
                displayOptions();
            }
        })
    })
}

function addNewProducts(){

    //Prompt user to input information about the new product
    inquirer.prompt([
        {
            name: "productName",
            message: "What is the name of the product?",
            validation: function(value){
                if(isNaN(value) === false)
                    {return true;}
                else
                    {return false;}
            }
        },

        {
            name: "departmentName",
            message: "Which department does this product belongs to?",
            validation: function(value){
                if(isNaN(value) === false)
                    {return true;}
                else
                    {return false;}
            }
        },

        {
            name: "Price",
            message: "What will be the price of this product?",
            validation: function(value){
                if(isNaN(value) === false)
                    {return true;}
                else
                    {return false;}
            }
        },

        {
            name: "stockQuantity",
            message: "How many units of this product are available?",
            validate: function(value){
                if(isNaN(value) === false && Number.isInteger(parseFloat(value)))
                {return true;}
            else 
                {return false;}
            }
        }
    ]).then(answer => {
        //Insert new product (row)
        connection.query("INSERT INTO products SET ?", 
        {product_name: answer.productName, 
        department_name: answer.departmentName, 
        price: answer.Price,
        stock_quantity: answer.stockQuantity});

        console.log("The inventory has been updated with the new product");
        viewProducts();
    })
}

function Quit(){
    connection.end();
}