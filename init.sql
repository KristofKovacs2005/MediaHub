-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2026 at 05:18 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mediahub`
--

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@'%' FUNCTION `login` (`email` VARCHAR(255), `pwd` VARCHAR(100)) RETURNS INT(11) DETERMINISTIC BEGIN
DECLARE ok INTEGER;
SET ok = 0;
SELECT u_id INTO ok FROM users WHERE users.email = email AND users.password = pwd_encrypt(pwd);
RETURN ok;
END$$

CREATE DEFINER=`root`@'%' FUNCTION `pwd_encrypt` (`pwd` VARCHAR(100)) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_hungarian_ci DETERMINISTIC RETURN SHA2(concat(pwd,'valamivalami'),256)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `i_id` int(11) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `i_name` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `i_description` text DEFAULT NULL,
  `amount` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`i_id`, `author`, `i_name`, `img_url`, `i_description`, `amount`) VALUES
(1, 'J. D. Salinger', 'Rozsban a fogó', '/uploads/raf.jpg', 'A Rozsban a fogó vagy Zabhegyező (eredeti angol címe: The Catcher in the Rye) J. D. Salinger korszakos regénye, melyet először 1945–1946 között publikáltak a The New Yorker hasábjain folytatásokban, majd 1951-ben jelent meg önálló könyvként.', 2),
(2, 'Lev Nyikolajevics Tolszoj', 'Iván Iljics halála', '/uploads/iih.jpg', 'Az Ivan Iljics halála Lev Tolsztoj először 1886-ban megjelent nagy sikerű kisregénye. Témája az ember belső küzdelme az elkerülhetetlen halállal egészen a megbékélésig.', 1),
(3, 'Umberto Eco', 'A rózsa neve', '/uploads/arn.jpg', 'A rózsa neve (Il nome della rosa) Umberto Eco olasz szemiotikaprofesszor első regénye, mely először 1980-ban jelent meg. ', 1),
(4, 'Robert Merle', 'Majomábécé', '/uploads/mabc.jpg', 'A Majomábécé (Le propre de l’homme) Robert Merle Goncourt-díjas francia író 1989-ben írt regénye. Ez a tudományos tényeken alapuló fikció az ember és az állat, jelen esetben az ember és az egyik főemlős – egy csimpánz – kapcsolatát mutatja be.', 1),
(5, 'Quentin Tarantino', 'Becstelen brigantyk', '/uploads/bb.jpg', 'A Becstelen brigantyk (Inglourious Basterds) Quentin Tarantino 2009 augusztusában bemutatott, második világháborús filmje, Brad Pitt-tel a főszerepben. A forgatás 2008 októberében kezdődött,[4] többek között Németországban és Franciaországban forgatták.', 1),
(6, 'Quentin Tarantino', 'Ponyvaregény', '/uploads/pr.jpg', 'A Ponyvaregény (eredeti cím: Pulp Fiction) 1994-ben bemutatott amerikai bűnügyi film Quentin Tarantino rendezésében.', 1),
(7, 'Christopher Nolan', 'Csillagok között', '/uploads/ck.jpg', 'A Csillagok között (eredeti cím: Interstellar) 2014-ben bemutatott sci-fi film, amely felvonultatja a 21. századi elméleti fizika elképzeléseit a világűrről, a téridőről, valamint felvázolja a zsákutcába jutott emberiség lehetséges jövőjét.', 1),
(8, 'Francis Ford Coppola', 'A keresztapa', '/uploads/ka.png', 'A Keresztapa (The Godfather) Mario Puzo azonos című regényéből készült 1972-ben bemutatott világhírű filmdráma Francis Ford Coppola rendezésében Marlon Brando, Al Pacino, Robert Duvall és James Caan főszereplésével.', 1),
(9, '	Frank Darabont', 'A remény rabjai', '/uploads/arr.jpeg', 'A remény rabjai (eredeti cím: The Shawshank Redemption) 1994-ben bemutatott amerikai filmdráma, melyet Frank Darabont írt és rendezett. A forgatókönyv alapjául Stephen King azonos című regénye szolgált.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `item_tag`
--

CREATE TABLE `item_tag` (
  `i_id` int(11) NOT NULL,
  `t_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `item_tag`
--

INSERT INTO `item_tag` (`i_id`, `t_id`) VALUES
(1, 1),
(1, 7),

(2, 1),
(2, 5),

(3, 1),
(3, 5),
(3, 8),
(3, 10),

(4, 1),
(4, 9),


(5, 2),
(5, 5),
(5, 6),
(5, 7),
(5, 10),

(6, 2),
(6, 3),
(6, 6),
(6, 7),
(6, 8),
(6, 10),

(7, 2),
(7, 9),

(8, 2),
(8, 8),

(9, 2),
(9, 8),
(9, 10);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `o_id` int(11) NOT NULL,
  `s_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `return_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`o_id`, `s_id`, `u_id`, `p_id`, `date`, `return_date`) VALUES
(1, 6, 1, 0, '2025-11-12', '2025-11-19'),
(2, 6, 2, 1, '2025-11-13', '2025-11-20'),
(3, 4, 6, 1, '2026-02-11', '2026-02-25'),
(4, 5, 6, 1, '2026-02-11', '2026-02-25');

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `os_id` int(11) NOT NULL,
  `os_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`os_id`, `os_name`) VALUES
(1, 'awaiting acceptance'),
(2, 'accepted'),
(3, 'rejected'),
(4, 'returned'),
(5, 'returned late'),
(6, 'late');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `r_id` int(11) NOT NULL,
  `i_id` int(11) DEFAULT NULL,
  `u_id` int(11) DEFAULT NULL,
  `flagged` tinyint(1) DEFAULT NULL,
  `stars` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `reason` VARCHAR(255) DEFAULT null
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`r_id`, `i_id`, `u_id`, `flagged`, `stars`, `comment`, `reason`) VALUES
(1, 2, 2, 1, 3, 'A könyv közepes', "A vélemény rossz."),
(2, 1, 1, 0, 5, NULL, NULL),
(3, 6, 2, 1, 4, 'A film jó', "Ez nem igaz");

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `s_id` int(11) NOT NULL,
  `s_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`s_id`, `s_name`) VALUES
(1, 'felhasználó'),
(2, 'figyelmeztetett felhasználó'),
(3, 'felfüggesztett felhasználó'),
(4, 'könyvtáros'),
(5, 'moderátor');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `t_id` int(11) NOT NULL,
  `t_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`t_id`, `t_name`) VALUES
(1, 'book'),
(2, 'movie'),
(3, 'romance'),
(4, 'horror'),
(5, 'historical'),
(6, 'action'),
(7, 'comedy'),
(8, 'crime'),
(9, 'sci-fi'),
(10, 'thriller'),
(11, 'fantasy');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `insert_user` BEFORE INSERT ON `users` FOR EACH ROW set new.password = pwd_encrypt(new.password)
$$
DELIMITER ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `username`, `email`, `password`, `status`) VALUES
(1, 'vki', 'f1@email.com', 'password123', 1),
(2, 'fl38', 'f2@email.com', 'password123', 2),
(3, 'konyv', 'f3@email.com', 'password123', 4),
(4, 'mod', 'f4@email.com', 'password123', 5),
(6, 'en', 'en@gmail.com', 'password123', 1);



--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`i_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`o_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`os_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`r_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`t_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `i_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `os_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `r_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@'%' EVENT `daily_date_update_for_order_status_if_late` ON SCHEDULE EVERY 1 DAY STARTS '2025-12-23 23:59:16' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE orders
    SET s_id = 6
    WHERE return_date < CURDATE() AND (s_id != 4 OR s_id != 5)$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
