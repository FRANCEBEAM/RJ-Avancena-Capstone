-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2022 at 09:44 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+08:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rjavancena`
--

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `AccountNum` varchar(100) NOT NULL,
  `merchandise` varchar(100) NOT NULL,
  `accounts` varchar(100) NOT NULL,
  `inventory` varchar(100) NOT NULL,
  `transactions` varchar(100) NOT NULL,
  `orders` varchar(100) NOT NULL,
  `volume` varchar(5) NOT NULL DEFAULT '0.5',
  `theme` varchar(50) NOT NULL DEFAULT 'light',
  `interface` varchar(50) NOT NULL DEFAULT 'close',
  `rowcount` int(10) NOT NULL DEFAULT 10,
  `itemsPerRow` int(10) NOT NULL DEFAULT 3,
  `alert` varchar(100) NOT NULL DEFAULT 'notification',
  `difference` int(5) NOT NULL DEFAULT 10
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `AccountNum`, `merchandise`, `accounts`, `inventory`, `transactions`, `orders`, `volume`, `theme`, `interface`, `rowcount`, `itemsPerRow`, `alert`, `difference`) VALUES
(0, 'ACCT00000001', '', 'Administrator', '', '', '', '0.5', 'light', 'open', 2, 3, 'notification', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AccountNum` (`AccountNum`);
COMMIT;

ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
