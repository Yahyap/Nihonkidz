-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2024 at 05:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `website edukasi jepang`
--

-- --------------------------------------------------------

--
-- Table structure for table `tabel_artikel`
--

CREATE TABLE `tabel_artikel` (
  `id` int(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi1` mediumtext NOT NULL,
  `deskripsi2` mediumtext NOT NULL,
  `deskripsi3` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tabel_artikel`
--

INSERT INTO `tabel_artikel` (`id`, `judul`, `deskripsi1`, `deskripsi2`, `deskripsi3`) VALUES
(8, 'Lorem ipsum dolor', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut etiam sit amet nisl purus. Aenean euismod elementum nisi quis eleifend. Lectus sit amet est placerat in egestas erat imperdiet sed. Ut lectus arcu bibendum at varius vel. Tincidunt dui ut ornare lectus sit amet est placerat in. In fermentum et sollicitudin ac orci phasellus egestas tellus. Magna etiam tempor orci eu lobortis elementum. Diam in arcu cursus euismod. Sapien eget mi proin sed libero. Dolor sit amet consectetur adipiscing. Vel facilisis volutpat est velit egestas. Arcu risus quis varius quam quisque. Mi sit amet mauris commodo quis. Non arcu risus quis varius quam quisque id diam vel. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut etiam sit amet nisl purus. Aenean euismod elementum nisi quis eleifend. Lectus sit amet est placerat in egestas erat imperdiet sed. Ut lectus arcu bibendum at varius vel. Tincidunt dui ut ornare lectus sit amet est placerat in. In fermentum et sollicitudin ac orci phasellus egestas tellus. Magna etiam tempor orci eu lobortis elementum. Diam in arcu cursus euismod. Sapien eget mi proin sed libero. Dolor sit amet consectetur adipiscing. Vel facilisis volutpat est velit egestas. Arcu risus quis varius quam quisque. Mi sit amet mauris commodo quis. Non arcu risus quis varius quam quisque id diam vel. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut etiam sit amet nisl purus. Aenean euismod elementum nisi quis eleifend. Lectus sit amet est placerat in egestas erat imperdiet sed. Ut lectus arcu bibendum at varius vel. Tincidunt dui ut ornare lectus sit amet est placerat in. In fermentum et sollicitudin ac orci phasellus egestas tellus. Magna etiam tempor orci eu lobortis elementum. Diam in arcu cursus euismod. Sapien eget mi proin sed libero. Dolor sit amet consectetur adipiscing. Vel facilisis volutpat est velit egestas. Arcu risus quis varius quam quisque. Mi sit amet mauris commodo quis. Non arcu risus quis varius quam quisque id diam vel. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor.');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `user_id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`user_id`, `fullname`, `user_email`, `user_password`, `createdAt`, `updateAt`) VALUES
(39, 'adadqwdwqd', 'svzdgdgsgsdds@gmail.com', '$2b$08$pAqYyli.kO7VjgHjhBDTte4fk0Mrt/E7i0nEreDQU44JzLdkf909.', '2024-05-02T04:00:22.916Z', '2024-05-02T04:03:33.909Z');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tabel_artikel`
--
ALTER TABLE `tabel_artikel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tabel_artikel`
--
ALTER TABLE `tabel_artikel`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
