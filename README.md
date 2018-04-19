# Bamazon

This repository contains two Node.js applications: bamazonCustomer.js and bamazonManager.js.

bamazonCustomer.js is a CLI storefront application. It displays items for sale and lets the customer select an item, by ID number, and a quantity of that item to purchase. The app then checks the item in inventory to make sure the order can be fulfilled; if so, the app calculates the total for the customer's purchase and exits.

bamazonManager.js is a CLI storefront management application. It offers four choices to the storefront manager:
* View products for sale (lists entire inventory including the department name to which each item belongs)
* View low inventory (displays items present in quantities less than 5)
* Add to inventory (lets managers specify a new total inventory for an existing item in case of re-orders)
* Add new product (allows managers to add unique new items to the storefront)

Demo video URL:  https://youtu.be/SWOO9irkTMQ

Technologies used: Node.js, MySQL
NPM packages: mysql, inquirer