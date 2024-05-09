-- Insert statements for users table
INSERT INTO users (username, email, password) VALUES
('user1', 'user1@example.com', 'password1'),
('user2', 'user2@example.com', 'password2'),
('user3', 'user3@example.com', 'password3');

-- Insert statements for products table
INSERT INTO products (name, description, price, stock_quantity, created_at, updated_at) VALUES
('Product 1', 'Description for Product 1', 10.99, 100, NOW(), NOW()),
('Product 2', 'Description for Product 2', 19.99, 50, NOW(), NOW()),
('Product 3', 'Description for Product 3', 5.99, 200, NOW(), NOW());

-- Insert statements for cart table
INSERT INTO cart (user_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 1, 3),
(3, 3, 4);

-- Insert statements for admins table
INSERT INTO admins (username, email, password) VALUES
('admin1', 'admin1@example.com', 'adminpassword1'),
('admin2', 'admin2@example.com', 'adminpassword2');

-- Insert statements for categories table
INSERT INTO categories (name, description) VALUES
('Category 1', 'Description for Category 1'),
('Category 2', 'Description for Category 2'),
('Category 3', 'Description for Category 3');

