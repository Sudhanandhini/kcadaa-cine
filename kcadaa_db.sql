-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2025 at 11:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kcadaa_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin', '$2b$10$Kir/wfhOa/h.Gtjb1vlIieCTFfhZfI8ws/RCd76p4wrheDS9sKYj.', '2025-12-08 10:44:46');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `website`, `phone`, `subject`, `message`, `created_at`) VALUES
(1, 'Sunsys Test', 'support@sunsys.in', 'test.com', '08015544855', 'test', 'test', '2025-12-09 05:46:29'),
(2, 'Sunsys Test1', 'support@sunsys.in', 'test.com', '08015544855', 'test', 'test3', '2025-12-09 05:50:04');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `member_id` varchar(20) DEFAULT NULL,
  `category` enum('committee','board','art-director','asst-art-director') NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `biography` text DEFAULT NULL,
  `awards` text DEFAULT NULL,
  `filmography` text DEFAULT NULL,
  `social_links` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `name`, `role`, `member_id`, `category`, `image`, `biography`, `awards`, `filmography`, `social_links`, `created_at`, `updated_at`) VALUES
(3, 'Mallikarjun', 'General Secreatary', '02', 'board', '/uploads/1765194141369.jpg', 'Ravi S A is a Production Designer in Kannada Film Industry. He has won the Karnataka State \r\nAward for Best Production Design two times', '2013 -Best Production Designer - Bajarangi\r\n2013 -Best Production Designer - Bajarangi', '2000|Movie|Art Director\r\n2013|Movie|Art Director', NULL, '2025-12-08 11:42:21', '2025-12-08 11:42:21'),
(4, 'SUNDARMURTHY V', 'Asst. Art Director ', '05', 'asst-art-director', '/uploads/1765194246842.jpg', 'Ravi S A is a Production Designer in Kannada Film Industry. He has won the Karnataka State\r\nAward for Best Production Design two times', '2013 -Best Production Designer - Bajarangi\r\n2020- News Chandana Academy Critics Award, Best Art Director', '256|movie|director\r\n152|movie|director', NULL, '2025-12-08 11:44:06', '2025-12-08 11:44:06'),
(5, 'HOSMANE MURTHY', 'Art Director ', '13', 'art-director', '/uploads/1765194369931.jpg', 'Ravi S A is a Production Designer in Kannada Film Industry. He has won the Karnataka State\r\nAward for Best Production Design two times', '2013 -Best Production Designer - Bajarangi\r\n2020- News Chandana Academy Critics Award, Best Art Director', '5000|movie|director\r\n2000|movie|director', NULL, '2025-12-08 11:46:09', '2025-12-08 11:46:09'),
(6, 'Sashidhara Adapa B', 'Honorable President', '06', 'board', '/uploads/1765254039799.jpg', 'Ravi S A is a Production Designer in Kannada Film Industry. He has won the Karnataka State\r\nAward for Best Production Design two times', '2013 -Best Production Designer - Bajarangi\r\n2013 -Best Production Designer - Bajarangi', '2000|Movie name|Art director\r\n2008|Movie name|Art director\r\n2012|Movie name|Art director', 'Instagram|https://mail.google.com/\r\nTwitter|https://mail.google.com/\r\nFacebook|https://mail.google.com/', '2025-12-09 04:20:39', '2025-12-09 07:06:44'),
(8, 'RAGHAVENDRA ', 'Asst. Art Director', '12', 'asst-art-director', '/uploads/1765256106000.jpg', 'Ravi S A is a Production Designer in Kannada Film Industry. He has won the Karnataka State Award for Best Production Design two times', '2013 -Best Production Designer - Bajarangi\r\n2013 -Best Production Designer - Bajarangi', '2065|movie|director\r\n2065|movie|director', 'Twitter|https://mail.google.com/\r\nFacebook|https://mail.google.com/\r\nLinkedIn|https://mail.google.com/\r\nYouTube|https://mail.google.com/\r\nWebsite|https://mail.google.com/\r\nOther|https://mail.google.com/', '2025-12-09 04:55:06', '2025-12-09 07:06:02'),
(9, 'test', 'art director', '30', 'art-director', '/uploads/1765264084452.jpg', 'test', 'test', 'test|test|test', 'Instagram|https://mail.google.com/\r\nTwitter|https://mail.google.com/', '2025-12-09 07:08:04', '2025-12-09 07:08:04'),
(10, 'Vasantarao M Kulkarni', 'Committee Member', '59', 'committee', '/uploads/1765265585194.jpg', 'test', 'test', '2000|Movie|Director', 'Twitter|https://mail.google.com/\r\nInstagram|https://mail.google.com/', '2025-12-09 07:33:05', '2025-12-09 09:07:55'),
(13, 'Mahesh', 'committee Member', '34', 'committee', '/uploads/1765271366507.jpg', 'test', 'test', '302|test|test', 'Instagram|https://mail.google.com/', '2025-12-09 09:09:26', '2025-12-09 09:09:26'),
(14, 'Kumar', 'Committee Member', '45', 'committee', '/uploads/1765271425755.jpg', 'test', 'test', '23|test|test', 'Facebook|https://mail.google.com/', '2025-12-09 09:10:25', '2025-12-09 09:10:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
