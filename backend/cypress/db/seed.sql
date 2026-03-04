


use mediahub;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

delete from items;

INSERT INTO `items` (`i_id`, `author`, `i_name`, `img_url`, `i_description`, `amount`) VALUES
(1, 'J. D. Salinger', 'Rozsban a fogó', '/uploads/raf.jpg', 'A Rozsban a fogó vagy Zabhegyező (eredeti angol címe: The Catcher in the Rye) J. D. Salinger korszakos regénye, melyet először 1945–1946 között publikáltak a The New Yorker hasábjain folytatásokban, majd 1951-ben jelent meg önálló könyvként.', 2),
(2, 'Lev Nyikolajevics Tolszoj', 'Iván Iljics halála', '/uploads/iih.jpg', 'Az Ivan Iljics halála Lev Tolsztoj először 1886-ban megjelent nagy sikerű kisregénye. Témája az ember belső küzdelme az elkerülhetetlen halállal egészen a megbékélésig.', 1),
(3, 'Umberto Eco', 'A rózsa neve', '/uploads/arn.jpg', 'A rózsa neve (Il nome della rosa) Umberto Eco olasz szemiotikaprofesszor első regénye, mely először 1980-ban jelent meg. ', 1),
(4, 'Robert Merle', 'Majomábécé', '/uploads/mabc.jpg', 'A Majomábécé (Le propre de l’homme) Robert Merle Goncourt-díjas francia író 1989-ben írt regénye. Ez a tudományos tényeken alapuló fikció az ember és az állat, jelen esetben az ember és az egyik főemlős – egy csimpánz – kapcsolatát mutatja be.', 1),
(5, 'Quentin Tarantino', 'Becstelen brigantyk', '/uploads/bb.jpg', 'A Becstelen brigantyk (Inglourious Basterds) Quentin Tarantino 2009 augusztusában bemutatott, második világháborús filmje, Brad Pitt-tel a főszerepben. A forgatás 2008 októberében kezdődött,[4] többek között Németországban és Franciaországban forgatták.', 1),
(6, 'Quentin Tarantino', 'Ponyvaregény', '/uploads/pr.jpg', 'A Ponyvaregény (eredeti cím: Pulp Fiction) 1994-ben bemutatott amerikai bűnügyi film Quentin Tarantino rendezésében.', 1),
(7, 'Christopher Nolan', 'Csillagok között', '/uploads/ck.jpg', 'A Csillagok között (eredeti cím: Interstellar) 2014-ben bemutatott sci-fi film, amely felvonultatja a 21. századi elméleti fizika elképzeléseit a világűrről, a téridőről, valamint felvázolja a zsákutcába jutott emberiség lehetséges jövőjét.', 1),
(8, 'Francis Ford Coppola', 'A keresztapa', '/uploads/ka.png', 'A Keresztapa (The Godfather) Mario Puzo azonos című regényéből készült 1972-ben bemutatott világhírű filmdráma Francis Ford Coppola rendezésében Marlon Brando, Al Pacino, Robert Duvall és James Caan főszereplésével.', 1),
(9, '	Frank Darabont', 'A remény rabjai', '/uploads/arr.jpeg', 'A remény rabjai (eredeti cím: The Shawshank Redemption) 1994-ben bemutatott amerikai filmdráma, melyet Frank Darabont írt és rendezett. A forgatókönyv alapjául Stephen King azonos című regénye szolgált.', 0);

-- --------------------------------------------------------

delete from item_tag;
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
--
-- Dumping data for table `orders`
--
delete from orders;
INSERT INTO `orders` (`o_id`, `s_id`, `u_id`, `p_id`, `date`, `return_date`) VALUES
(1, 1, 1, 3, '2025-11-12', '2026-11-19'),
(2, 5, 2, 1, '2025-11-13', '2026-11-20'),
(3, 4, 6, 1, '2026-02-11', '2026-02-25'),
(4, 5, 6, 1, '2026-02-11', '2026-02-25');

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

--
-- Dumping data for table `order_status`
--
delete from order_status;
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
--
-- Dumping data for table `reviews`
--
delete from reviews;
INSERT INTO `reviews` (`r_id`, `i_id`, `u_id`, `flagged`, `stars`, `comment`, `reason`) VALUES
(1, 2, 2, 1, 3, 'A könyv közepes', "A vélemény rossz."),
(2, 1, 1, 0, 5, NULL, NULL),
(3, 6, 2, 1, 4, 'A film jó', "Ez nem igaz");

-- --------------------------------------------------------

--
-- Table structure for table `status`
--


delete from status;
INSERT INTO `status` (`s_id`, `s_name`) VALUES
(1, 'felhasználó'),
(2, 'figyelmeztetett felhasználó'),
(3, 'felfüggesztett felhasználó'),
(4, 'könyvtáros'),
(5, 'moderátor');

-- --------------------------------------------------------


delete from tag;
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


delete from users;
INSERT INTO `users` (`u_id`, `username`, `email`, `password`, `status`) VALUES
(1, 'vki', 'f1@email.com', 'password123', 1),
(2, 'fl38', 'f2@email.com', 'password123', 2),
(3, 'konyv', 'f3@email.com', 'password123', 4),
(4, 'mod', 'f4@email.com', 'password123', 5),
(6, 'en', 'en@gmail.com', 'password123', 1);



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



