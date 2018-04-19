var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "root",
    database: "bamazon"
});
connection.connect(function (error) {
    if (error) {
        throw error;
    }
    inquirer.prompt(
        {
            name: "managerOption",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "Select an option: "
        }
    ).then(function (response) {
        switch (response.managerOption) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        }
    });
});

function viewProducts() {
    connection.query("SELECT * FROM products", function (error, res) {
        if (error) {
            throw error;
        }
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("\nProduct name: " + res[i].product_name);
            console.log("\nPrice: " + res[i].price);
            console.log("\nQuantity: " + res[i].stock_quantity);
            console.log("---------------------\n");
        }
        connection.end();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("\nProduct name: " + res[i].product_name);
            console.log("\nPrice: " + res[i].price);
            console.log("\nQuantity: " + res[i].stock_quantity);
            console.log("---------------------\n");
        }
        connection.end();
    });
}

function addToInventory() {
    inquirer.prompt([
        {
            name: "itemId",
            type: "input",
            message: "Enter item ID to update: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter new quantity: "
        }
    ]).then(function (answers) {
        connection.query("UPDATE products SET stock_quantity=" + answers.quantity + " WHERE item_id=" + answers.itemId, function (err, res) {
            if (err) {
                throw err;
            }
            console.log("Quantity of item " + answers.itemId + " updated...");
            viewProducts();
        });
    });
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "itemId",
            type: "input",
            message: "Enter a unique item ID: "
        },
        {
            name: "productName",
            type: "input",
            message: "Enter product name: "
        },
        {
            name: "departmentName",
            type: "input",
            message: "Enter department name: "
        },
        {
            name: "price",
            type: "input",
            message: "Enter price: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter quantity: "
        }
    ]).then(function (answers) {
        connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (?,?,?,?,?)", [answers.itemId, answers.productName, answers.departmentName, answers.price, answers.quantity], function (err, res) {
            if (err) {
                throw err;
            }
            console.log("Product added...");
            viewProducts();
        }
        )
    });
}
