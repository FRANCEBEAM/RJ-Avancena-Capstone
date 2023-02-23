-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2022 at 12:44 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rjavancena`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(15) NOT NULL,
  `accint` varchar(100) NOT NULL,
  `accnum` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(12) NOT NULL,
  `otp` varchar(9) NOT NULL DEFAULT 'RJAVA',
  `birthmonth` varchar(2) NOT NULL,
  `birthday` varchar(2) NOT NULL,
  `birthyear` varchar(4) NOT NULL,
  `birthdate` varchar(255) NOT NULL,
  `house` varchar(100) NOT NULL,
  `street` varchar(50) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL DEFAULT 'San Jose del Monte',
  `province` varchar(50) NOT NULL DEFAULT 'Bulacan',
  `address` varchar(255) NOT NULL,
  `userlevel` varchar(50) NOT NULL DEFAULT 'Cashier',
  `status` varchar(50) NOT NULL DEFAULT 'Active',
  `date` date DEFAULT curdate(),
  `time` time DEFAULT curtime(),
  `profilesrc` varchar(255) NOT NULL DEFAULT '../assets/img/invert.png',
  `profilename` varchar(255) NOT NULL DEFAULT 'DEFAULT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `accint`, `accnum`, `firstname`, `lastname`, `fullname`, `username`, `hashed_password`, `email`, `contact`, `otp`, `birthmonth`, `birthday`, `birthyear`, `birthdate`, `house`, `street`, `barangay`, `city`, `province`, `address`, `userlevel`, `status`, `date`, `time`, `profilesrc`, `profilename`) VALUES
(1, '1', 'ACCT00000001', 'Jed', 'Terrazola', 'Jed Terrazola', 'shinxzxzxz', '$2y$10$p14GqxR8OPHT7rlig5W.n.5jIgT0OltB.uEsb1ZgQxH30mMLmcTyi', 'jed.terrazola.r@bulsu.edu.ph', '9125694558', '134484', '3', '3', '2001', '2001-3-3', 'Blk 100 Lot 6 Area B Purok 9', 'Masuerte', 'Bagong Buhay I', 'San Jose del Monte', 'Bulacan', 'Blk 100 Lot 6 Area B Purok 9 Masuerte, Brgy. Bagong Buhay I, San Jose del Monte, Bulacan', 'Administrator', 'Active', '2022-09-21', '00:03:34', '../assets/img/invert.png', 'DEFAULT'),
(84, '', 'rja_a62cb99cf4312745cb246eff11d1de', 'Jed', 'Terrazola', '', 'jedterrazola', '$2y$10$gQQZX/nsY/q.tuQCXENR4.GqW9Dhqcv9R9T3o3/CTnmLekUR1XOFq', 'jed.terrazola.r@gmail.com', '9123456789', '134484', '', '', '', '', 'Blk 100 Lot 100 Subdivision 100', 'Street 100', 'Fatima II', 'San Jose del Monte', 'Bulacan', '', 'Customer', 'Active', '2022-11-28', '22:45:11', '../assets/img/invert.png', 'DEFAULT');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `prefix` varchar(10) NOT NULL,
  `serialint` int(50) NOT NULL,
  `serialnumber` varchar(50) NOT NULL,
  `product` varchar(200) NOT NULL,
  `specs` mediumtext NOT NULL,
  `quantity` int(10) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `reorder` int(10) NOT NULL,
  `category` varchar(50) NOT NULL,
  `supplier` varchar(50) NOT NULL,
  `filedir` varchar(150) NOT NULL,
  `filename` varchar(50) NOT NULL,
  `filepath` varchar(150) NOT NULL,
  `filesrc` varchar(150) NOT NULL,
  `encoder` varchar(150) NOT NULL,
  `date` date DEFAULT curdate(),
  `time` time DEFAULT curtime(),
  `slides_001` varchar(255) NOT NULL DEFAULT '../assets/img/default.jpg',
  `slides_002` varchar(255) NOT NULL DEFAULT '../assets/img/default.jpg',
  `slides_003` varchar(255) NOT NULL DEFAULT '../assets/img/default.jpg',
  `filename_001` varchar(255) NOT NULL DEFAULT 'DEFAULT',
  `filename_002` varchar(255) NOT NULL DEFAULT 'DEFAULT',
  `filename_003` varchar(255) NOT NULL DEFAULT 'DEFAULT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `prefix`, `serialint`, `serialnumber`, `product`, `specs`, `quantity`, `price`, `reorder`, `category`, `supplier`, `filedir`, `filename`, `filepath`, `filesrc`, `encoder`, `date`, `time`, `slides_001`, `slides_002`, `slides_003`, `filename_001`, `filename_002`, `filename_003`) VALUES
(2455, 'ELECT', 1, 'ELECT00000001', 'Electric Drill 180W', 'The 18V LXT Sub-Compact Brushless Driver-Drill (XFD15ZB, tool only) is a drilling and driving solution with significantly less weight. The 18V Sub-Compact Driver-Drill offers the size and weight of lower voltage tools, but with the performance, power, and compatibility of 18-Volt. It has an efficient brushless motor with two speed settings and dual L.E.D. lights to illuminate the work area. At only 5-78 in. long, it is a compact drilling and driving solution with superior comfort and handling.  Its part of Makitas expanding 18V LXT System, the worlds largest cordless tool system powered by 18V lithium-ion slide-style batteries. Makita 18V LXT Lithium-Ion Batteries have the fastest charge times in their categories, so they spend more time working and less time sitting on the charger.  For improved tool performance and extended battery life, Makita created Star Protection Computer Controls. Star Protection is communication technology that allows the Star Protection-equipped tool and battery to exchange data in real time and monitor conditions during use to protect against overloading, over-discharging and overheating. For increased versatility, the tool can also be powered by Makita 18V LXT Lithium-Ion Batteries with the star symbol on the battery indicating Star Protection inside.', 100, '1000.00', 40, 'Electric Tools', 'Makita', '../uploads/ELECT/ELECT00000001/', 'ELECT00000001.png', '/uploads/ELECT/ELECT00000001/ELECT00000001.png', '../uploads/ELECT/ELECT00000001/ELECT00000001.png', 'Jed Terrazola', '2022-11-28', '18:39:08', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2456, 'PAINT', 1, 'PAINT00000001', 'Accolade 3L', 'Accolade is a pale, bright, sun-kissed white paint color with a lemon undertone. It is a perfect paint color for any room. Pair it with deeper golden yellow walls.', 1000, '750.00', 100, 'Paints and Thinners', 'Accolade', '../uploads/PAINT/PAINT00000001/', 'PAINT00000001.jpg', '/uploads/PAINT/PAINT00000001/PAINT00000001.jpg', '../uploads/PAINT/PAINT00000001/PAINT00000001.jpg', 'Jed Terrazola', '2022-11-28', '18:44:19', '../uploads/PAINT/PAINT00000001/PAINT00000001_001.jpg', '../uploads/PAINT/PAINT00000001/PAINT00000001_002.jpg', '../uploads/PAINT/PAINT00000001/PAINT00000001_003.jpg', 'PAINT00000001_001.jpg', 'PAINT00000001_002.jpg', 'PAINT00000001_003.jpg'),
(2457, 'ABC', 1, 'ABC00000001', 'ZXC-001', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'ABC00000001.png', '', '../uploads/ABC/ABC00000001/ABC00000001.png', 'Jed Terrazola', '2022-11-28', '20:03:48', '../uploads/ABC/ABC00000001/ABC00000001_001.webp', '../uploads/ABC/ABC00000001/ABC00000001_002.webp', '../uploads/ABC/ABC00000001/ABC00000001_003.webp', 'ABC00000001_001.webp', 'ABC00000001_002.webp', 'ABC00000001_003.webp'),
(2458, 'ABC', 2, 'ABC00000002', 'ZXC-002', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:48', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2459, 'ABC', 3, 'ABC00000003', 'ZXC-003', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:48', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2460, 'ABC', 4, 'ABC00000004', 'ZXC-004', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:48', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2461, 'ABC', 5, 'ABC00000005', 'ZXC-005', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:48', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2462, 'ABC', 6, 'ABC00000006', 'ZXC-006', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2463, 'ABC', 7, 'ABC00000007', 'ZXC-007', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2464, 'ABC', 8, 'ABC00000008', 'ZXC-008', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2465, 'ABC', 9, 'ABC00000009', 'ZXC-009', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2466, 'ABC', 10, 'ABC00000010', 'ZXC-010', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2467, 'ABC', 11, 'ABC00000011', 'ZXC-011', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2468, 'ABC', 12, 'ABC00000012', 'ZXC-012', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2469, 'ABC', 13, 'ABC00000013', 'ZXC-013', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2470, 'ABC', 14, 'ABC00000014', 'ZXC-014', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2471, 'ABC', 15, 'ABC00000015', 'ZXC-015', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2472, 'ABC', 16, 'ABC00000016', 'ZXC-016', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2473, 'ABC', 17, 'ABC00000017', 'ZXC-017', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2474, 'ABC', 18, 'ABC00000018', 'ZXC-018', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2475, 'ABC', 19, 'ABC00000019', 'ZXC-019', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2476, 'ABC', 20, 'ABC00000020', 'ZXC-020', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2477, 'ABC', 21, 'ABC00000021', 'ZXC-021', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2478, 'ABC', 22, 'ABC00000022', 'ZXC-022', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2479, 'ABC', 23, 'ABC00000023', 'ZXC-023', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2480, 'ABC', 24, 'ABC00000024', 'ZXC-024', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2481, 'ABC', 25, 'ABC00000025', 'ZXC-025', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2482, 'ABC', 26, 'ABC00000026', 'ZXC-026', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2483, 'ABC', 27, 'ABC00000027', 'ZXC-027', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2484, 'ABC', 28, 'ABC00000028', 'ZXC-028', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2485, 'ABC', 29, 'ABC00000029', 'ZXC-029', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2486, 'ABC', 30, 'ABC00000030', 'ZXC-030', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2487, 'ABC', 31, 'ABC00000031', 'ZXC-031', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2488, 'ABC', 32, 'ABC00000032', 'ZXC-032', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2489, 'ABC', 33, 'ABC00000033', 'ZXC-033', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2490, 'ABC', 34, 'ABC00000034', 'ZXC-034', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2491, 'ABC', 35, 'ABC00000035', 'ZXC-035', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2492, 'ABC', 36, 'ABC00000036', 'ZXC-036', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2493, 'ABC', 37, 'ABC00000037', 'ZXC-037', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2494, 'ABC', 38, 'ABC00000038', 'ZXC-038', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2495, 'ABC', 39, 'ABC00000039', 'ZXC-039', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2496, 'ABC', 40, 'ABC00000040', 'ZXC-040', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2497, 'ABC', 41, 'ABC00000041', 'ZXC-041', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2498, 'ABC', 42, 'ABC00000042', 'ZXC-042', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2499, 'ABC', 43, 'ABC00000043', 'ZXC-043', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2500, 'ABC', 44, 'ABC00000044', 'ZXC-044', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2501, 'ABC', 45, 'ABC00000045', 'ZXC-045', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2502, 'ABC', 46, 'ABC00000046', 'ZXC-046', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2503, 'ABC', 47, 'ABC00000047', 'ZXC-047', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2504, 'ABC', 48, 'ABC00000048', 'ZXC-048', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2505, 'ABC', 49, 'ABC00000049', 'ZXC-049', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2506, 'ABC', 50, 'ABC00000050', 'ZXC-050', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2507, 'ABC', 51, 'ABC00000051', 'ZXC-051', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2508, 'ABC', 52, 'ABC00000052', 'ZXC-052', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2509, 'ABC', 53, 'ABC00000053', 'ZXC-053', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2510, 'ABC', 54, 'ABC00000054', 'ZXC-054', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2511, 'ABC', 55, 'ABC00000055', 'ZXC-055', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2512, 'ABC', 56, 'ABC00000056', 'ZXC-056', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2513, 'ABC', 57, 'ABC00000057', 'ZXC-057', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2514, 'ABC', 58, 'ABC00000058', 'ZXC-058', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2515, 'ABC', 59, 'ABC00000059', 'ZXC-059', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2516, 'ABC', 60, 'ABC00000060', 'ZXC-060', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2517, 'ABC', 61, 'ABC00000061', 'ZXC-061', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2518, 'ABC', 62, 'ABC00000062', 'ZXC-062', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2519, 'ABC', 63, 'ABC00000063', 'ZXC-063', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2520, 'ABC', 64, 'ABC00000064', 'ZXC-064', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2521, 'ABC', 65, 'ABC00000065', 'ZXC-065', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2522, 'ABC', 66, 'ABC00000066', 'ZXC-066', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2523, 'ABC', 67, 'ABC00000067', 'ZXC-067', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:49', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2524, 'ABC', 68, 'ABC00000068', 'ZXC-068', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2525, 'ABC', 69, 'ABC00000069', 'ZXC-069', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2526, 'ABC', 70, 'ABC00000070', 'ZXC-070', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2527, 'ABC', 71, 'ABC00000071', 'ZXC-071', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2528, 'ABC', 72, 'ABC00000072', 'ZXC-072', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2529, 'ABC', 73, 'ABC00000073', 'ZXC-073', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2530, 'ABC', 74, 'ABC00000074', 'ZXC-074', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2531, 'ABC', 75, 'ABC00000075', 'ZXC-075', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2532, 'ABC', 76, 'ABC00000076', 'ZXC-076', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2533, 'ABC', 77, 'ABC00000077', 'ZXC-077', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2534, 'ABC', 78, 'ABC00000078', 'ZXC-078', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2535, 'ABC', 79, 'ABC00000079', 'ZXC-079', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2536, 'ABC', 80, 'ABC00000080', 'ZXC-080', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2537, 'ABC', 81, 'ABC00000081', 'ZXC-081', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2538, 'ABC', 82, 'ABC00000082', 'ZXC-082', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2539, 'ABC', 83, 'ABC00000083', 'ZXC-083', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2540, 'ABC', 84, 'ABC00000084', 'ZXC-084', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2541, 'ABC', 85, 'ABC00000085', 'ZXC-085', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2542, 'ABC', 86, 'ABC00000086', 'ZXC-086', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2543, 'ABC', 87, 'ABC00000087', 'ZXC-087', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2544, 'ABC', 88, 'ABC00000088', 'ZXC-088', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2545, 'ABC', 89, 'ABC00000089', 'ZXC-089', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2546, 'ABC', 90, 'ABC00000090', 'ZXC-090', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2547, 'ABC', 91, 'ABC00000091', 'ZXC-091', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2548, 'ABC', 92, 'ABC00000092', 'ZXC-092', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2549, 'ABC', 93, 'ABC00000093', 'ZXC-093', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2550, 'ABC', 94, 'ABC00000094', 'ZXC-094', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2551, 'ABC', 95, 'ABC00000095', 'ZXC-095', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2552, 'ABC', 96, 'ABC00000096', 'ZXC-096', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2553, 'ABC', 97, 'ABC00000097', 'ZXC-097', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2554, 'ABC', 98, 'ABC00000098', 'ZXC-098', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2555, 'ABC', 99, 'ABC00000099', 'ZXC-099', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2556, 'ABC', 100, 'ABC00000100', 'ZXC-100', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2557, 'ABC', 101, 'ABC00000101', 'ZXC-101', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2558, 'ABC', 102, 'ABC00000102', 'ZXC-102', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2559, 'ABC', 103, 'ABC00000103', 'ZXC-103', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2560, 'ABC', 104, 'ABC00000104', 'ZXC-104', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2561, 'ABC', 105, 'ABC00000105', 'ZXC-105', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2562, 'ABC', 106, 'ABC00000106', 'ZXC-106', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2563, 'ABC', 107, 'ABC00000107', 'ZXC-107', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2564, 'ABC', 108, 'ABC00000108', 'ZXC-108', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2565, 'ABC', 109, 'ABC00000109', 'ZXC-109', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2566, 'ABC', 110, 'ABC00000110', 'ZXC-110', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2567, 'ABC', 111, 'ABC00000111', 'ZXC-111', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2568, 'ABC', 112, 'ABC00000112', 'ZXC-112', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2569, 'ABC', 113, 'ABC00000113', 'ZXC-113', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2570, 'ABC', 114, 'ABC00000114', 'ZXC-114', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2571, 'ABC', 115, 'ABC00000115', 'ZXC-115', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2572, 'ABC', 116, 'ABC00000116', 'ZXC-116', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2573, 'ABC', 117, 'ABC00000117', 'ZXC-117', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2574, 'ABC', 118, 'ABC00000118', 'ZXC-118', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2575, 'ABC', 119, 'ABC00000119', 'ZXC-119', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2576, 'ABC', 120, 'ABC00000120', 'ZXC-120', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2577, 'ABC', 121, 'ABC00000121', 'ZXC-121', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2578, 'ABC', 122, 'ABC00000122', 'ZXC-122', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2579, 'ABC', 123, 'ABC00000123', 'ZXC-123', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2580, 'ABC', 124, 'ABC00000124', 'ZXC-124', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2581, 'ABC', 125, 'ABC00000125', 'ZXC-125', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2582, 'ABC', 126, 'ABC00000126', 'ZXC-126', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2583, 'ABC', 127, 'ABC00000127', 'ZXC-127', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2584, 'ABC', 128, 'ABC00000128', 'ZXC-128', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2585, 'ABC', 129, 'ABC00000129', 'ZXC-129', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2586, 'ABC', 130, 'ABC00000130', 'ZXC-130', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2587, 'ABC', 131, 'ABC00000131', 'ZXC-131', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:50', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2588, 'ABC', 132, 'ABC00000132', 'ZXC-132', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2589, 'ABC', 133, 'ABC00000133', 'ZXC-133', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2590, 'ABC', 134, 'ABC00000134', 'ZXC-134', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2591, 'ABC', 135, 'ABC00000135', 'ZXC-135', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2592, 'ABC', 136, 'ABC00000136', 'ZXC-136', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2593, 'ABC', 137, 'ABC00000137', 'ZXC-137', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2594, 'ABC', 138, 'ABC00000138', 'ZXC-138', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT');
INSERT INTO `inventory` (`id`, `prefix`, `serialint`, `serialnumber`, `product`, `specs`, `quantity`, `price`, `reorder`, `category`, `supplier`, `filedir`, `filename`, `filepath`, `filesrc`, `encoder`, `date`, `time`, `slides_001`, `slides_002`, `slides_003`, `filename_001`, `filename_002`, `filename_003`) VALUES
(2595, 'ABC', 139, 'ABC00000139', 'ZXC-139', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2596, 'ABC', 140, 'ABC00000140', 'ZXC-140', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2597, 'ABC', 141, 'ABC00000141', 'ZXC-141', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2598, 'ABC', 142, 'ABC00000142', 'ZXC-142', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2599, 'ABC', 143, 'ABC00000143', 'ZXC-143', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2600, 'ABC', 144, 'ABC00000144', 'ZXC-144', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2601, 'ABC', 145, 'ABC00000145', 'ZXC-145', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2602, 'ABC', 146, 'ABC00000146', 'ZXC-146', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2603, 'ABC', 147, 'ABC00000147', 'ZXC-147', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2604, 'ABC', 148, 'ABC00000148', 'ZXC-148', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2605, 'ABC', 149, 'ABC00000149', 'ZXC-149', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2606, 'ABC', 150, 'ABC00000150', 'ZXC-150', '1/4 inches, Color Blue, Smooth Texture', 75, '100.00', 100, 'Products', 'ZXC Corp', '', 'DEFAULT', '', '../assets/img/default.jpg', 'Jed Terrazola', '2022-11-28', '20:03:51', '../assets/img/default.jpg', '../assets/img/default.jpg', '../assets/img/default.jpg', 'DEFAULT', 'DEFAULT', 'DEFAULT'),
(2607, 'TEST', 1, 'TEST00000001', 'TESTING PRODUCT', 'Testing Specs', 1000, '100.00', 100, 'Testing Category', 'Testing Supplier', '', 'TEST00000001.webp', '', '../uploads/TEST/TEST00000001/TEST00000001.webp', 'Jed Terrazola', '2022-11-28', '20:06:32', '../uploads/TEST/TEST00000001/TEST00000001_001.webp', '../uploads/TEST/TEST00000001/TEST00000001_002.webp', '../uploads/TEST/TEST00000001/TEST00000001_003.webp', 'TEST00000001_001.webp', 'TEST00000001_002.webp', 'TEST00000001_003.webp');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `accnum` varchar(100) NOT NULL,
  `merchandise` varchar(100) NOT NULL,
  `accounts` varchar(100) NOT NULL,
  `inventory` varchar(100) NOT NULL,
  `transactions` varchar(100) NOT NULL,
  `orders` varchar(100) NOT NULL,
  `volume` varchar(5) NOT NULL DEFAULT '0.5',
  `theme` varchar(50) NOT NULL DEFAULT 'light',
  `interface` varchar(50) NOT NULL DEFAULT 'close',
  `rowcount` int(10) NOT NULL DEFAULT 10,
  `items_per_row` int(10) NOT NULL DEFAULT 3,
  `alert` varchar(100) NOT NULL DEFAULT 'notification',
  `difference` int(5) NOT NULL DEFAULT 10,
  `row_acc` int(11) NOT NULL DEFAULT 10,
  `row_inv` int(11) NOT NULL DEFAULT 10,
  `row_ord` int(11) NOT NULL DEFAULT 10,
  `row_tra` int(11) NOT NULL DEFAULT 10
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `accnum`, `merchandise`, `accounts`, `inventory`, `transactions`, `orders`, `volume`, `theme`, `interface`, `rowcount`, `items_per_row`, `alert`, `difference`, `row_acc`, `row_inv`, `row_ord`, `row_tra`) VALUES
(1, 'ACCT00000001', '', 'Administrator', 'ABC', '', '', '0.5', 'dark', 'open', 10, 3, 'prompt', 10, 10, 75, 10, 10),
(7, 'ACCT00000002', '', 'Administrator', 'TEST', '', '', '0.5', 'light', 'close', 10, 3, 'notification', 10, 10, 200, 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `system_settings`
--

CREATE TABLE `system_settings` (
  `id` int(11) NOT NULL,
  `accept_data` varchar(10) NOT NULL DEFAULT 'true',
  `inventory_diff` int(10) NOT NULL DEFAULT 10,
  `cashier_log` varchar(10) NOT NULL DEFAULT 'true',
  `cashier_edit` varchar(10) NOT NULL DEFAULT 'false',
  `cashier_del` varchar(10) NOT NULL DEFAULT 'false',
  `cashier_void` varchar(10) NOT NULL DEFAULT 'false',
  `customer_log` varchar(10) NOT NULL DEFAULT 'true',
  `primary_admin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_settings`
--

INSERT INTO `system_settings` (`id`, `accept_data`, `inventory_diff`, `cashier_log`, `cashier_edit`, `cashier_del`, `cashier_void`, `customer_log`, `primary_admin`) VALUES
(1, 'true', 10, 'true', 'false', 'false', 'false', 'true', 'ACCT00000001');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `serialnumber` (`serialnumber`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accnum` (`accnum`);

--
-- Indexes for table `system_settings`
--
ALTER TABLE `system_settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2608;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `system_settings`
--
ALTER TABLE `system_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
