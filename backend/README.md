PORT = 3000
DB_HOST = "localhost"
DATABASE = "mediahub"
DB_USER = "root"
JWT_SECRET = "secret"
UPLOAD_DIR_NAME = "/uploads"
MAX_FILE_SIZE = "2097152"

-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS mediahub
    DEFAULT CHARACTER SET = 'utf8mb4';

USE mediahub;

-- =====================
-- TABLE: items
-- =====================
CREATE TABLE IF NOT EXISTS items(
    i_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author VARCHAR(255),
    i_name VARCHAR(255),
    img_url VARCHAR(255),
    i_description BLOB
);

INSERT INTO items (author, i_name, img_url, i_description) VALUES
('Valaki', 'Test Item 1', 'kep1', 'ez egy könyv'),
('Más', 'Test Item 2', 'kep2', 'ez egy film');

-- =====================
-- TABLE: status
-- =====================
CREATE TABLE IF NOT EXISTS status(
    s_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    s_name VARCHAR(255)
);

INSERT INTO status (s_name) VALUES
("felhasználó"),
("figyelmeztetett felhasználó"),
("felfüggesztett felhasználó"),
("könyvtáros"),
("moderátor");

-- =====================
-- TABLE: tag
-- =====================
CREATE TABLE IF NOT EXISTS tag(
    t_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    t_name VARCHAR(255)
);

INSERT INTO tag (t_name) VALUES
("book"),
("movie"),
("romance"),
("horror"),
("history"),
("action"),
("comedy");

-- =====================
-- TABLE: order_status
-- =====================
CREATE TABLE IF NOT EXISTS order_status(
    os_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    os_name VARCHAR(255)
);

INSERT INTO order_status (os_name) VALUES
("awaiting acceptance"),
("accepted"),
("rejected"),
("returned"),
("returned late"),
("late");

-- =====================
-- TABLE: reviews
-- =====================
CREATE TABLE IF NOT EXISTS reviews(
    r_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    i_id INT,
    u_id INT,
    flagged BOOLEAN,
    stars INT,
    comment BLOB
);

INSERT INTO reviews (i_id, u_id, flagged, stars, comment) VALUES
(1, 2, TRUE, 3, "A könyv közepes"),
(1, 1, FALSE, 5, NULL),
(2, 2, FALSE, 4, "A film jó");

-- =====================
-- TABLE: users
-- =====================
CREATE TABLE IF NOT EXISTS users(
    u_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status INT NOT NULL
);

-- =====================
-- FUNCTION: pwd_encrypt
-- =====================
DELIMITER $$
CREATE FUNCTION IF NOT EXISTS pwd_encrypt(pwd VARCHAR(100))
RETURNS VARCHAR(255) DETERMINISTIC
BEGIN
    RETURN SHA2(CONCAT(pwd,'valamivalami'),256);
END$$
DELIMITER ;

-- =====================
-- TRIGGERS for users
-- =====================
DELIMITER $$
CREATE TRIGGER insert_user BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    SET NEW.password = pwd_encrypt(NEW.password);
END$$

CREATE TRIGGER update_user BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    SET NEW.password = pwd_encrypt(NEW.password);
END$$
DELIMITER ;

-- =====================
-- Insert mock users
-- =====================
INSERT INTO users (username, email, password, status) VALUES
("felhasz12", "f1@email.com", "j1", 1),
("fl38", "f2@email.com", "j1", 2),
("konyv", "f3@email.com", "j1", 4),
("mod", "f4@email.com", "j1", 5);

-- =====================
-- TABLE: orders
-- =====================
CREATE TABLE IF NOT EXISTS orders(
    o_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    s_id INT NOT NULL,
    u_id INT NOT NULL,
    p_id INT NOT NULL,
    date DATE NOT NULL,
    return_date DATE
);

INSERT INTO orders (s_id, u_id, p_id, date, return_date) VALUES
(1, 2, 1, "2025-11-13", "2025-11-20"),
(0, 0, 0, "2025-11-12", "2025-11-19");

-- =====================
-- TABLE: item_tag
-- =====================
CREATE TABLE IF NOT EXISTS item_tag(
    i_id INT NOT NULL,
    t_id INT NOT NULL
);

INSERT INTO item_tag (i_id, t_id) VALUES
(1, 1),
(1, 3),
(1, 5),
(2, 2),
(2, 6),
(2, 7);

-- =====================
-- SAMPLE JOIN QUERIES
-- =====================
-- Get items with tags and reviews
SELECT items.i_id, items.i_name, items.author, items.i_description, items.img_url, 
GROUP_CONCAT(tag.t_name ORDER BY tag.t_name SEPARATOR ', ') AS Tagek,
GROUP_CONCAT(reviews.r_id ORDER BY reviews.r_id SEPARATOR ', ') AS review 
FROM items 
INNER JOIN item_tag ON items.i_id = item_tag.i_id 
INNER JOIN tag ON item_tag.t_id = tag.t_id 
LEFT JOIN reviews ON items.i_id = reviews.i_id
GROUP BY items.i_id, items.i_name
HAVING Tagek LIKE "%romance%" AND Tagek LIKE "%history%";

-- Get reviews for a specific item
SELECT reviews.comment, reviews.stars, users.username
FROM reviews 
INNER JOIN items ON reviews.i_id = items.i_id 
INNER JOIN users ON reviews.u_id = users.u_id
WHERE items.i_id = 2;

-- =====================
-- EVENT: daily update for late orders
-- =====================
CREATE EVENT IF NOT EXISTS daily_date_update_for_order_status_if_late
ON SCHEDULE EVERY 1 DAY
DO
UPDATE orders
SET s_id = 6
WHERE return_date < CURDATE() AND s_id NOT IN (4,5);
