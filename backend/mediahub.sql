CREATE DATABASE mediahub
    DEFAULT CHARACTER SET = 'utf8mb4';

USE mediahub

CREATE TABLE items(
    i_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author VARCHAR(255),
    i_name VARCHAR(255),
    img_url VARCHAR(255),
    i_description BLOB
);

ALTER Table items AUTO_INCREMENT = 1;

INSERT INTO items VALUES(NULL, "someone", "book", "kep1", "This is a simple book"),
                        (NULL, "other", "movie", "kep2", "This is a simple movie");

DELETE FROM items;

CREATE TABLE status(
    s_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    s_name VARCHAR(255)
);

INSERT INTO status VALUES(NULL, "felhasználó"),
                            (NULL, "figyelmeztetett felhasználó"),
                            (NULL, "felfüggesztett felhasználó"),
                            (NULL, "könyvtáros"),
                            (NULL, "moderátor");

DELETE FROM status;

CREATE TABLE tag(
    t_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    t_name VARCHAR(255)
);

ALTER Table tag AUTO_INCREMENT = 1;

INSERT INTO tag VALUES(NULL, "book"),
                        (NULL, "movie"),
                        (NULL, "romance"),
                        (NULL, "horror"),
                        (NULL, "history"),
                        (NULL, "action"),
                        (NULL, "comedy");

DELETE FROM tag;

CREATE TABLE order_status(
    os_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    os_name VARCHAR(255)
);

ALTER Table order_status AUTO_INCREMENT = 1;

INSERT INTO order_status VALUES(NULL, "awaiting acceptance"),
                                (NULL, "accepted"),
                                (NULL, "rejected"),
                                (NULL, "returned"),
                                (NULL, "returned late"),
                                (NULL, "late");

DELETE FROM order_status;

CREATE Table reviews(
    r_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    i_id INT,
    u_id INT,
    flagged BOOLEAN,
    stars INT,
    comment BLOB
);

ALTER Table reviews AUTO_INCREMENT = 1;

INSERT INTO reviews VALUES
    (NULL, 1, 2, TRUE, 3, "A könyv közepes"),
    (NULL, 1, 1, FALSE, 5, NULL),
    (NULL, 2, 2, FALSE, 4, "A film jó");

DELETE FROM reviews;

CREATE TABLE users(
    u_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status INT NOT NULL
);
/*to-do: encypt, login auth, add mock users, etc...*/

ALTER Table users AUTO_INCREMENT = 1;

DELETE FROM users;

create trigger insert_user BEFORE insert on users
for each row set new.password = pwd_encrypt(new.password);

create trigger update_user BEFORE UPDATE on users /*// futtatni*/
for each row set new.password = pwd_encrypt(new.password);

DROP Trigger insert_user;
DROP Trigger update_user; /*// futatni*/

create FUNCTION pwd_encrypt(pwd varchar(100))
RETURNS VARCHAR(255) DETERMINISTIC
RETURN SHA2(concat(pwd,'valamivalami'),256);

DROP Function pwd_encrypt;

CREATE Function login(email VARCHAR(255), pwd VARCHAR(100))
RETURNS INTEGER DETERMINISTIC
BEGIN
DECLARE ok INTEGER;
SET ok = 0;
SELECT u_id INTO ok FROM users WHERE users.email = email AND users.password = pwd_encrypt(pwd);
RETURN ok;
END;

DROP Function login;

INSERT INTO users VALUES
    (NULL, "felhasz12", "f1@email.com", "j1", 1),
    (NULL, "fl38", "f2@email.com", "j1", 2),
    (NULL, "konyv", "f3@email.com", "j1", 4),
    (NULL, "mod", "f4@email.com", "j1", 5);


CREATE Table orders(
    o_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    s_id INT NOT NULL,
    u_id INT NOT NULL,
    p_id INT NOT NULL,
    date DATE NOT NULL,
    return_date DATE
);

ALTER Table orders AUTO_INCREMENT = 1;

DROP Table orders;

INSERT INTO orders VALUES
    (NULL, 0, 0, 0, "2025-11-12", "2025-11-19"),
    (NULL, 1, 2, 1, "2025-11-13", "2025-11-20");

DELETE FROM orders;

CREATE Table item_tag(
    i_id INT NOT NULL,
    t_id INT NOT NULL
);

INSERT INTO item_tag VALUES
    (1, 1),
    (1, 3),
    (1, 5),
    (2, 2),
    (2, 6),
    (2, 7);

DELETE FROM item_tag;


SELECT items.i_id, items.i_name, items.author, items.i_description, items.img_url, 
GROUP_CONCAT(tag.t_name ORDER BY t_name SEPARATOR ', ') AS Tagek,
GROUP_CONCAT(reviews.r_id ORDER BY reviews.r_id SEPARATOR ", ") as review 
FROM items 
inner join item_tag on items.i_id = item_tag.i_id 
INNER JOIN tag on item_tag.t_id = tag.t_id 
INNER JOIN reviews on items.i_id = reviews.i_id
GROUP BY items.i_id, items.i_name
HAVING items.i_name LIKE "book" AND Tagek LIKE "%romance%" AND Tagek LIKE "%history%";

SELECT reviews.comment, reviews.stars, users.username
FROM reviews 
INNER JOIN items ON reviews.i_id = items.i_id 
INNER JOIN users ON reviews.u_id = users.u_id
WHERE items.i_id = 2;

