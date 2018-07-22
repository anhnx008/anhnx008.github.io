DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Cardigan", "Clothing", 20.00, 5),
	   ("Jean", "Clothing", 25.50, 30),
       ("Chromebook", "Electronics", 199.00, 10),
       ("Chromecast", "Electronics", 29.99, 2),
       ("Microwave", "Kitchen Appliances", 70.00, 5),
       ("Blender", "Kitchen Appliances", 29.99, 7),
       ("Flip flop", "Shoes", 5.00, 40),
       ("Amazon Echo", "Electronics", 39.99, 12),
       ("Coffee Maker", "Kitchen Appliances", 25.99, 4),
       ("Sweater", "Clothing", 14.95, 10);
       

