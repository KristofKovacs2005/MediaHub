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
(1, 'teszt', 'dsa', '/uploads/images.jpeg', 'teszt', 2),
(2, 'Más', 'dsa', '/uploads/images.jpeg', 'ez egy film', 1),
(6, 'teszt', 'teszt', '/uploads/images.jpeg', 'teszt', 1),
(7, 'teszt', 'teszt', '/uploads/images.jpeg', 'teszt', 1);

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
(5, 1),
(5, 2),
(5, 3),
(6, 1),
(6, 2),
(6, 3),
(7, 4),
(7, 5),
(7, 6);

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
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`r_id`, `i_id`, `u_id`, `flagged`, `stars`, `comment`) VALUES
(1, 1, 2, 1, 3, 'A könyv közepes'),
(2, 1, 1, 0, 5, NULL),
(3, 2, 2, 0, 4, 'A film jó'),
(4, 6, 6, 0, 1, 'valami');

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
(5, 'history'),
(6, 'action'),
(7, 'comedy');

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `username`, `email`, `password`, `status`) VALUES
(1, 'vki', 'f1@email.com', SHA2(CONCAT('password123','valamivalami'),256), 1),
(2, 'fl38', 'f2@email.com', SHA2(CONCAT('password123','valamivalami'),256), 2),
(3, 'konyv', 'f3@email.com', SHA2(CONCAT('password123','valamivalami'),256), 4),
(4, 'mod', 'f4@email.com', SHA2(CONCAT('password123','valamivalami'),256), 5),
(6, 'en', 'en@gmail.com', SHA2(CONCAT('password123','valamivalami'),256), 1);

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `insert_user` BEFORE INSERT ON `users` FOR EACH ROW set new.password = pwd_encrypt(new.password)
$$
DELIMITER ;

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
