-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2022 at 09:51 AM
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
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(15) NOT NULL,
  `AccNo` varchar(100) NOT NULL,
  `AccountNum` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(12) NOT NULL,
  `otp` varchar(9) NOT NULL DEFAULT 'RJAVA',
  `birthmonth` int(2) NOT NULL DEFAULT 1,
  `birthday` int(2) NOT NULL DEFAULT 1,
  `birthyear` int(4) NOT NULL DEFAULT 2000,
  `birthdate` varchar(255) NOT NULL,
  `house` varchar(100) NOT NULL,
  `street` varchar(50) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `userlevel` varchar(50) NOT NULL DEFAULT 'Cashier',
  `status` varchar(50) NOT NULL DEFAULT 'Active',
  `date` date DEFAULT curdate(),
  `time` time DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `AccNo`, `AccountNum`, `firstname`, `lastname`, `fullname`, `username`, `hashed_password`, `email`, `contact`, `otp`, `birthmonth`, `birthday`, `birthyear`, `birthdate`, `house`, `street`, `barangay`, `city`, `province`, `address`, `userlevel`, `status`, `date`, `time`) VALUES
(1, '00000001', 'ACCT00000001', 'Jed', 'Terrazola', 'Jed Terrazola', 'shinxzxzxz', '$2y$10$hfdFahmkDPqipXv10K15Beh1F1E1CL0BhSikCYbb1Ycf4J72dB3xe', 'jed.terrazola.r@bulsu.edu.ph', '9125694558', '', 3, 3, 2001, '2001-3-3', 'Blk 100 Lot 6 Area B Purok 9', 'Masuerte', 'Bagong Buhay I', 'San Jose del Monte', 'Bulacan', 'Blk 100 Lot 6 Area B Purok 9 Masuerte, Brgy. Bagong Buhay I, San Jose del Monte, Bulacan', 'Administrator', 'Active', '2022-09-21', '00:03:34');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
