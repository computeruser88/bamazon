
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(80),
	department_name VARCHAR(30),
    price DECIMAL(10, 2),
    stock_quantity INT(10)
);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("Google Pixel 2 XL", "Electronics", 849.00, 5);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("Samsung Galaxy S9 Plus", "Electronics", 840.00, 4);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("Hermes Silk Tie", "Clothing", 180.00, 3);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("Coach Slim Billfold Wallet", "Leather Goods", 150.00, 9);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("Bamazon Paper and Credit Card Shredder", "Office Supplies", 50.00, 10);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("Eloquent JavaScript", "Books", 39.95, 5);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("Design Patterns", "Books", 59.99, 10);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("Stash Double Spice Chai Tea, 100 Count", "Food and Drink", 19.39, 9);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("iPhone X", "Electronics", 999.00, 11);
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("Applying UML and Patterns", "Books", 72.94, 10);
