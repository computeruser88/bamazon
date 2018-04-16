var mysql = require('mysql');
var inquirer = require('inquirer');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM products";
    con.query(sql, function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
          console.log("Item Id: " + result[i].item_id);
          console.log("Product Name: " + result[i].product_name);
          console.log("Price: " + result[i].price);
      }
    });
  });
