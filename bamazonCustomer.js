var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
  password: "root",
  database: "bamazon"
});

console.log("\nWelcome to Bamazon!\n\n");
connection.connect(function (error) {
  if (error) {
    throw error
  };
  displayItems();
});

function displayItems() {
  console.log("Displaying all items...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id);
      console.log("\nProduct name: " + res[i].product_name);
      console.log("\nPrice: " + res[i].price);
      console.log("---------------------\n");
    }
    promptUser();
  });
}

function promptUser() {
  inquirer.prompt([
    {
      name: "itemId",
      type: "input",
      message: "Enter item ID: "
    },
    {
      name: "quantity",
      type: "input",
      message: "Enter order quantity: "
    }
  ]).then(function (answer) {
    verifyQuantityExists(answer.itemId, answer.quantity);
  });
}

function updateQuantity(itemId, quantity, newQuantity) {
  connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQuantity
      },
      {
        item_id: itemId
      }
    ],
    function (error, response) {
      if (error) {
        throw error;
        return;
      }
      console.log("Quantity updated...");
      calculatePurchaseTotal(itemId, quantity);
      return;
    })
}

function calculatePurchaseTotal(itemId, quantity) {
  connection.query("SELECT * FROM products WHERE ?",
    {
      item_id: itemId
    }, function (error, response) {
      if (error) {
        throw error;
        return;
      }
      // console.log("response[0].price = " + response[0].price);
      // console.log("Quantity " + quantity);
      var total = response[0].price * quantity;
      console.log("Total for purchase: $" + total);
      connection.end();
    }
  );
}

function verifyQuantityExists(itemId, quantity) {
  connection.query("SELECT * FROM products WHERE ?",
    {
      item_id: itemId
    },
    function (error, response) {
      if (error) {
        throw error;
        return false;
      }
      if (parseFloat(response[0].stock_quantity) >= parseFloat(quantity)) { // response is stock quantity for that item
        var newQuantity = parseFloat(response[0].stock_quantity) - parseFloat(quantity);
        updateQuantity(itemId, quantity, newQuantity);
      } else {
        console.log("Insufficient quantity: " + response[0].stock_quantity + " left.");
        connection.end();
      }
    });
}