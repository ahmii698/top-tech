-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2026 at 07:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toptech_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'pending',
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `full_name`, `email`, `phone`, `appointment_date`, `appointment_time`, `message`, `created_at`, `status`, `updated_at`) VALUES
(2, 'Ahmed Baba', 'ahmedmalik30600@gmail.com', '21212121211', '2026-03-21', '12:12:00', 'asdasasd', '2026-03-20 03:21:14', 'pending', '2026-03-20 03:21:14'),
(3, 'Ahmed Baba', 'ahmedmalik30600@gmail.com', '21212121211', '2026-04-12', '00:12:00', 'sdasdasd', '2026-03-20 03:24:49', 'pending', '2026-03-20 03:24:49'),
(4, 'Ahmed Baba', 'ahmedmalik30600@gmail.com', '21212121211', '2026-04-12', '00:12:00', 'afsdafd', '2026-03-20 03:28:10', 'pending', '2026-03-20 03:28:10'),
(5, 'Ahmed Baba', 'ahmedmalik30600@gmail.com', '21212121211', '2026-04-12', '00:12:00', 'ggcvgh', '2026-03-20 03:31:55', 'pending', '2026-03-20 03:31:55'),
(6, 'Ahmed Ba', 'xahmedmalik30@gmail.com', '32321313221', '2026-04-21', '02:34:00', 'gdfsfasas', '2026-03-20 04:57:15', 'pending', '2026-03-20 04:57:15'),
(7, 'Ahmed Ba', 'xahmedmalik30@gmail.com', 'afsads', '2026-04-23', '02:34:00', 'fdsaf', '2026-03-20 05:00:29', 'pending', '2026-03-20 05:00:29'),
(8, 'Ahmed Ba', 'xahmedmalik30@gmail.com', 'afsads', '2026-04-23', '02:34:00', 'fdsaf', '2026-03-20 10:03:22', 'pending', NULL),
(11, 'asdas', 'xahmedmalik30@gmail.com', '0443323423', '2026-04-25', '11:11:00', 'dasdasdas', '2026-03-25 13:51:17', 'pending', NULL),
(12, 'asdas', 'xahmedmalik30@gmail.com', '0443323423', '2026-04-25', '11:11:00', 'dasdasdas', '2026-03-25 13:51:32', 'pending', NULL),
(13, 'Ahmed Ba', 'xahmedmalik30@gmail.com', '033221321312', '2026-04-25', '14:22:00', 'sadasd', '2026-03-25 13:52:04', 'pending', NULL),
(14, 'Ahmed Ba', 'xahmedmalik30@gmail.com', '0392389479283', '2026-04-04', '14:22:00', 'dasdas', '2026-03-25 13:56:01', 'pending', NULL),
(15, 'Ahmed', 'xahmedmalik30@gmail.com', '03322751363', '2026-04-04', '14:22:00', 'hghfd', '2026-03-25 14:53:24', 'pending', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `order_number` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `text`, `is_active`, `order_number`, `created_at`, `updated_at`) VALUES
(1, '✦ WORLD NO. 1 TECH SOLUTION COMPANY ✦', 1, 1, '2026-03-10 10:05:00', '2026-03-20 11:34:03'),
(2, '✦ 1000+ PROJECTS DELIVERED ✦', 1, 2, '2026-03-10 10:05:00', '2026-03-10 10:05:00'),
(3, '✦ 500+ HAPPY CLIENTS ✦', 1, 3, '2026-03-10 10:05:00', '2026-03-10 10:05:00'),
(4, '✦ 24/7 SUPPORT ✦', 1, 4, '2026-03-10 10:05:00', '2026-03-10 10:05:00'),
(5, '✦ AI-POWERED SOLUTIONS ✦', 1, 5, '2026-03-10 10:05:00', '2026-03-10 10:05:00');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext NOT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `is_published` tinyint(1) DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company_info`
--

CREATE TABLE `company_info` (
  `id` int(11) NOT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `business_hours` text DEFAULT NULL,
  `map_embed_url` text DEFAULT NULL,
  `facebook_url` varchar(255) DEFAULT NULL,
  `twitter_url` varchar(255) DEFAULT NULL,
  `instagram_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_info`
--

INSERT INTO `company_info` (`id`, `address`, `phone`, `email`, `business_hours`, `map_embed_url`, `facebook_url`, `twitter_url`, `instagram_url`, `linkedin_url`, `created_at`, `updated_at`) VALUES
(1, '123 Tech Street, Silicon Valley, CA 94025', '+1 (555) 123-4567', 'info@toptech.com', 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.636256472517!2d-122.088654484685!3d37.422408979825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba5b3c4c0f0d%3A0x8c3c5f5f5f5f5f5f!2sGoogleplex!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus', '#', '#', '#', '#', '2026-03-10 10:05:13', '2026-03-10 10:05:13');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `is_replied` tinyint(1) DEFAULT 0,
  `replied_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cta_section`
--

CREATE TABLE `cta_section` (
  `id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT 'Ready to Transform Your Business?',
  `description` text DEFAULT NULL,
  `button_text` varchar(50) DEFAULT 'Start Your Project',
  `button_link` varchar(255) DEFAULT '#',
  `background_image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cta_section`
--

INSERT INTO `cta_section` (`id`, `title`, `description`, `button_text`, `button_link`, `background_image`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Ready to Transform Your Business?', 'Let\'s discuss how we can help you achieve your technology goals', 'Start Your Project', '#', NULL, 1, '2026-03-10 10:05:46', '2026-03-10 10:05:46');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `category` varchar(50) DEFAULT 'general',
  `order_number` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `order_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'How long does a typical project takes?', 'Project timelines vary based on complexity. A standard website takes 4-6 weeks, while complex applications may take 3-6 months. We\'ll provide a detailed timeline during consultation.', 'general', 1, 1, '2026-03-10 10:04:33', '2026-03-10 10:04:33'),
(2, 'Do you provide ongoing support?', 'Yes! We offer various maintenance and support packages to keep your project running smoothly. From security updates to feature additions, we\'ve got you covered.', 'general', 2, 1, '2026-03-10 10:04:33', '2026-03-10 10:04:33'),
(3, 'What technologies do you specialize in?', 'We specialize in modern technologies including React, Node.js, Python, AI/ML frameworks, and cloud platforms like AWS and Azure. We choose the best tech stack for each project.', 'general', 3, 1, '2026-03-10 10:04:33', '2026-03-10 10:04:33'),
(4, 'How do you handle project pricing?', 'We offer transparent pricing with fixed-cost projects or hourly rates. After understanding your requirements, we\'ll provide a detailed quote with no hidden costs.', 'general', 4, 1, '2026-03-10 10:04:33', '2026-03-10 10:04:33');

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` int(11) NOT NULL,
  `icon_name` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `stats` varchar(50) DEFAULT NULL,
  `order_number` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `icon_name`, `title`, `description`, `stats`, `order_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Code', 'Custom Development', 'Tailored software solutions designed for your unique business needs', '500+ Projects', 1, 1, '2026-03-10 10:02:47', '2026-03-10 10:02:47'),
(2, 'Shield', 'Enterprise Security', 'Bank-level security protocols to protect your valuable data', '99.9% Secure', 2, 1, '2026-03-10 10:02:47', '2026-03-10 10:02:47'),
(3, 'Zap', 'Lightning Fast', 'Optimized performance with cutting-edge technologies', '0.1s Response', 3, 1, '2026-03-10 10:02:47', '2026-03-10 10:02:47'),
(4, 'Users', 'Expert Team', '50+ certified professionals ready to tackle your challenges', '24/7 Available', 4, 1, '2026-03-10 10:02:47', '2026-03-10 10:02:47'),
(5, 'Rocket', 'Scalable Solutions', 'Built to grow with your business, from startup to enterprise', '100% Scalable', 5, 1, '2026-03-10 10:02:47', '2026-03-10 10:02:47'),
(6, 'Clock', '24/7 Support', 'Round-the-clock technical support for your peace of mind', 'Instant Response', 6, 1, '2026-03-10 10:02:47', '2026-03-10 10:02:47');

-- --------------------------------------------------------

--
-- Table structure for table `hero_section`
--

CREATE TABLE `hero_section` (
  `id` int(11) NOT NULL,
  `subtitle` varchar(100) DEFAULT 'Welcome to TopTech',
  `title` varchar(200) DEFAULT 'Innovative IT Solutions For Your Business',
  `description` text DEFAULT NULL,
  `button1_text` varchar(50) DEFAULT 'Get Started',
  `button1_link` varchar(255) DEFAULT '#',
  `button2_text` varchar(50) DEFAULT 'Watch Video',
  `button2_link` varchar(255) DEFAULT '#',
  `background_type` enum('3d','image','video') DEFAULT '3d',
  `background_value` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `unsubscribed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`id`, `email`, `is_active`, `subscribed_at`, `unsubscribed_at`) VALUES
(1, 'xahmedmalik30@gmail.com', 1, '2026-03-25 09:41:37', NULL),
(2, 'xahmedmalik30600@gmail.com', 1, '2026-03-25 10:47:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `content` longtext DEFAULT NULL,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expiry` datetime NOT NULL,
  `used` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plan_purchases`
--

CREATE TABLE `plan_purchases` (
  `id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `plan_name` varchar(255) NOT NULL,
  `price` varchar(50) NOT NULL,
  `period` varchar(50) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('pending','contacted','completed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plan_purchases`
--

INSERT INTO `plan_purchases` (`id`, `plan_id`, `plan_name`, `price`, `period`, `customer_name`, `customer_email`, `customer_phone`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Business', '$2,999', 'project', 'Ahmed', 'ahmedmalik30600@gmail.com', '03322751363', 'i love your work', 'pending', '2026-03-18 03:57:12', '2026-03-18 03:57:12'),
(2, 1, 'Starter', '$999', 'project', 'sufiyan', 'xahmedmalik30@gmail.com', '03322751363', 'sadas', 'pending', '2026-03-18 04:50:06', '2026-03-18 04:50:06'),
(3, 3, 'Enterprise', 'Custom', 'project', 'Ahmiii', 'xahmedmalik30600@gmail.com', '03322751363', 'asdasdsa', 'pending', '2026-03-25 07:35:06', '2026-03-25 07:35:06'),
(4, 3, 'Enterprise', 'Custom', 'project', 'Ahmed Ba', 'xahmedmalik30@gmail.com', '534534', 'asasasd', 'pending', '2026-03-25 08:28:38', '2026-03-25 08:28:38');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `category` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `client_name` varchar(100) DEFAULT NULL,
  `project_year` year(4) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `project_url` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `order_number` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`id`, `title`, `category`, `image`, `client_name`, `project_year`, `description`, `project_url`, `is_featured`, `order_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'E-Commerce Platform', 'development', 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500', 'FashionHub', '2024', 'A modern e-commerce platform with advanced features', 'https://example.com/project1', 1, 1, 1, '2026-03-11 10:49:42', '2026-03-11 10:49:42'),
(2, 'Banking App UI', 'design', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500', 'SecureBank', '2024', 'Modern banking application interface design', 'https://example.com/project2', 1, 2, 1, '2026-03-11 10:49:42', '2026-03-11 10:49:42'),
(3, 'CRM Dashboard', 'software', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500', 'SalesMaster', '2023', 'Comprehensive CRM dashboard for sales teams', 'https://example.com/project3', 1, 3, 1, '2026-03-11 10:49:42', '2026-03-11 10:49:42'),
(4, 'AI Chatbot', 'ai', 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500', 'TechSupport AI', '2024', 'Intelligent chatbot for customer support', 'https://example.com/project4', 1, 4, 1, '2026-03-11 10:49:42', '2026-03-11 10:49:42'),
(5, 'Social Media Campaign', 'marketing', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500', 'GrowthCo', '2023', 'Viral social media marketing campaign', 'https://example.com/project5', 1, 5, 1, '2026-03-11 10:49:42', '2026-03-11 10:49:42'),
(6, 'Healthcare Portal', 'development', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500', 'MediCare+', '2024', 'Patient portal for healthcare management', 'https://example.com/project6', 1, 6, 1, '2026-03-11 10:49:42', '2026-03-11 10:49:42'),
(7, 'Food Delivery App', 'development', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500', 'FoodieExpress', '2024', 'Mobile app for food delivery service', 'https://example.com/project7', 0, 7, 1, '2026-03-11 10:49:42', '2026-03-11 10:49:42'),
(8, 'Brand Identity', 'design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500', 'StartupX', '2023', 'Complete brand identity design', 'https://example.com/project8', 0, 8, 1, '2026-03-11 10:49:42', '2026-03-11 10:49:42');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_technologies`
--

CREATE TABLE `portfolio_technologies` (
  `id` int(11) NOT NULL,
  `portfolio_id` int(11) NOT NULL,
  `technology` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio_technologies`
--

INSERT INTO `portfolio_technologies` (`id`, `portfolio_id`, `technology`, `created_at`) VALUES
(1, 1, 'React', '2026-03-11 10:50:06'),
(2, 1, 'Node.js', '2026-03-11 10:50:06'),
(3, 1, 'MongoDB', '2026-03-11 10:50:06'),
(4, 2, 'Figma', '2026-03-11 10:50:06'),
(5, 2, 'Adobe XD', '2026-03-11 10:50:06'),
(6, 2, 'Sketch', '2026-03-11 10:50:06'),
(7, 3, 'Vue.js', '2026-03-11 10:50:06'),
(8, 3, 'Laravel', '2026-03-11 10:50:06'),
(9, 3, 'MySQL', '2026-03-11 10:50:06'),
(10, 4, 'Python', '2026-03-11 10:50:06'),
(11, 4, 'TensorFlow', '2026-03-11 10:50:06'),
(12, 4, 'NLP', '2026-03-11 10:50:06'),
(13, 5, 'Social Media', '2026-03-11 10:50:06'),
(14, 5, 'Analytics', '2026-03-11 10:50:06'),
(15, 5, 'Content Strategy', '2026-03-11 10:50:06'),
(16, 6, 'React Native', '2026-03-11 10:50:06'),
(17, 6, 'Firebase', '2026-03-11 10:50:06'),
(18, 6, 'Redux', '2026-03-11 10:50:06'),
(19, 7, 'Flutter', '2026-03-11 10:50:06'),
(20, 7, 'Firebase', '2026-03-11 10:50:06'),
(21, 7, 'Stripe', '2026-03-11 10:50:06'),
(22, 8, 'Illustrator', '2026-03-11 10:50:06'),
(23, 8, 'Photoshop', '2026-03-11 10:50:06'),
(24, 8, 'After Effects', '2026-03-11 10:50:06');

-- --------------------------------------------------------

--
-- Table structure for table `pricing_features`
--

CREATE TABLE `pricing_features` (
  `id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `feature` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pricing_features`
--

INSERT INTO `pricing_features` (`id`, `plan_id`, `feature`, `created_at`) VALUES
(1, 1, 'Custom Design', '2026-03-10 10:03:40'),
(2, 1, '5 Pages', '2026-03-10 10:03:40'),
(3, 1, 'Basic SEO', '2026-03-10 10:03:40'),
(4, 1, '1 Month Support', '2026-03-10 10:03:40'),
(5, 1, 'Responsive Design', '2026-03-10 10:03:40'),
(6, 2, 'Everything in Starter', '2026-03-10 10:03:40'),
(7, 2, '15 Pages', '2026-03-10 10:03:40'),
(8, 2, 'Advanced SEO', '2026-03-10 10:03:40'),
(9, 2, '3 Months Support', '2026-03-10 10:03:40'),
(10, 2, 'E-commerce Ready', '2026-03-10 10:03:40'),
(11, 2, 'Analytics Setup', '2026-03-10 10:03:40'),
(12, 3, 'Everything in Business', '2026-03-10 10:03:40'),
(13, 3, 'Unlimited Pages', '2026-03-10 10:03:40'),
(14, 3, 'Priority Support', '2026-03-10 10:03:40'),
(15, 3, 'Custom Features', '2026-03-10 10:03:40'),
(16, 3, 'Dedicated Team', '2026-03-10 10:03:40'),
(17, 3, 'SLA Agreement', '2026-03-10 10:03:40');

-- --------------------------------------------------------

--
-- Table structure for table `pricing_plans`
--

CREATE TABLE `pricing_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `period` varchar(20) DEFAULT 'project',
  `is_recommended` tinyint(1) DEFAULT 0,
  `button_text` varchar(50) DEFAULT 'Get Started',
  `button_link` varchar(255) DEFAULT '#',
  `order_number` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pricing_plans`
--

INSERT INTO `pricing_plans` (`id`, `name`, `price`, `period`, `is_recommended`, `button_text`, `button_link`, `order_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Starter', '$999', 'project', 0, 'Get Started', '#', 1, 1, '2026-03-10 10:03:23', '2026-03-10 10:03:23'),
(2, 'Business', '$2,999', 'project', 1, 'Get Started', '#', 2, 1, '2026-03-10 10:03:23', '2026-03-10 10:03:23'),
(3, 'Enterprise', 'Custom', 'project', 0, 'Get Started', '#', 3, 1, '2026-03-10 10:03:23', '2026-03-10 10:03:23');

-- --------------------------------------------------------

--
-- Table structure for table `process_steps`
--

CREATE TABLE `process_steps` (
  `id` int(11) NOT NULL,
  `step_number` varchar(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `icon_name` varchar(50) DEFAULT NULL,
  `order_number` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `process_steps`
--

INSERT INTO `process_steps` (`id`, `step_number`, `title`, `description`, `icon_name`, `order_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, '01', 'Discovery', 'We analyze your requirements and create detailed project roadmap', 'Target', 1, 1, '2026-03-10 10:03:01', '2026-03-10 10:03:01'),
(2, '02', 'Design', 'Creating intuitive designs and interactive prototypes', 'PenTool', 2, 1, '2026-03-10 10:03:01', '2026-03-10 10:03:01'),
(3, '03', 'Development', 'Agile development with regular updates', 'Code', 3, 1, '2026-03-10 10:03:01', '2026-03-10 10:03:01'),
(4, '04', 'Testing', 'Rigorous quality assurance and performance testing', 'Shield', 4, 1, '2026-03-10 10:03:01', '2026-03-10 10:03:01'),
(5, '05', 'Deployment', 'Seamless deployment and launch', 'Rocket', 5, 1, '2026-03-10 10:03:01', '2026-03-10 10:03:01');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `icon_name` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `category` enum('development','design','software','ai','marketing','other') DEFAULT 'development',
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `order_number` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `icon_name`, `title`, `description`, `category`, `image`, `link`, `order_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Globe', 'Website Development', 'Custom responsive websites that blend stunning design with powerful functionality to convert visitors into customers.', 'development', NULL, NULL, 1, 1, '2026-03-10 10:02:07', '2026-03-10 10:02:07'),
(2, 'Palette', 'Graphic Designing', 'Creative visual content that tells your brand story and creates lasting impressions with target audiences.', 'design', NULL, NULL, 2, 1, '2026-03-10 10:02:07', '2026-03-10 10:02:07'),
(3, 'Smartphone', 'App Development', 'Feature-rich mobile applications that deliver seamless experiences across all platforms for your business needs.', 'development', NULL, NULL, 3, 1, '2026-03-10 10:02:07', '2026-03-10 10:02:07'),
(4, 'Database', 'CRM Development', 'Tailored relationship management systems that streamline operations and enhance your customer engagement processes.', 'software', NULL, NULL, 4, 1, '2026-03-10 10:02:07', '2026-03-10 10:02:07'),
(5, 'Code', 'Web-Based Software', 'Scalable software solutions designed to handle complex business logic with intuitive interfaces.', 'software', NULL, NULL, 5, 1, '2026-03-10 10:02:07', '2026-03-10 10:02:07'),
(6, 'PenTool', 'UI/UX Design', 'User-centered interface designs that create intuitive digital experiences and boost user engagement.', 'design', NULL, NULL, 6, 1, '2026-03-10 10:02:07', '2026-03-10 10:02:07'),
(7, 'Cpu', 'AI/ML & Chatbots', 'Creating intelligent AI/ML solutions and chatbot interfaces that automate and enhance customer interactions.', 'ai', NULL, NULL, 7, 1, '2026-03-10 10:02:07', '2026-03-10 10:02:07'),
(8, 'TrendingUp', 'Digitalll Marketing', 'Data-driven digital marketing strategies that increase visibility, engagement, and conversions.', 'marketing', NULL, NULL, 8, 1, '2026-03-10 10:02:07', '2026-03-11 10:42:47');

-- --------------------------------------------------------

--
-- Table structure for table `service_features`
--

CREATE TABLE `service_features` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `feature` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_features`
--

INSERT INTO `service_features` (`id`, `service_id`, `feature`, `created_at`) VALUES
(1, 1, 'React/Next.js', '2026-03-10 10:02:31'),
(2, 1, 'E-commerce', '2026-03-10 10:02:31'),
(3, 1, 'CMS Integration', '2026-03-10 10:02:31'),
(4, 1, 'SEO Optimized', '2026-03-10 10:02:31'),
(5, 2, 'Logo Design', '2026-03-10 10:02:31'),
(6, 2, 'Brand Identity', '2026-03-10 10:02:31'),
(7, 2, 'Print Materials', '2026-03-10 10:02:31'),
(8, 2, 'Social Media Graphics', '2026-03-10 10:02:31'),
(9, 3, 'iOS & Android', '2026-03-10 10:02:31'),
(10, 3, 'React Native', '2026-03-10 10:02:31'),
(11, 3, 'Flutter', '2026-03-10 10:02:31'),
(12, 3, 'Native Apps', '2026-03-10 10:02:31'),
(13, 4, 'Sales Force', '2026-03-10 10:02:31'),
(14, 4, 'Customer Portal', '2026-03-10 10:02:31'),
(15, 4, 'Analytics', '2026-03-10 10:02:31'),
(16, 4, 'Automation', '2026-03-10 10:02:31'),
(17, 5, 'SaaS Products', '2026-03-10 10:02:31'),
(18, 5, 'Dashboard', '2026-03-10 10:02:31'),
(19, 5, 'API Integration', '2026-03-10 10:02:31'),
(20, 5, 'Cloud Based', '2026-03-10 10:02:31'),
(21, 6, 'Wireframing', '2026-03-10 10:02:31'),
(22, 6, 'Prototyping', '2026-03-10 10:02:31'),
(23, 6, 'User Research', '2026-03-10 10:02:31'),
(24, 6, 'Usability Testing', '2026-03-10 10:02:31'),
(25, 7, 'Chatbots', '2026-03-10 10:02:31'),
(26, 7, 'Predictive Analytics', '2026-03-10 10:02:31'),
(27, 7, 'NLP', '2026-03-10 10:02:31'),
(28, 7, 'Computer Vision', '2026-03-10 10:02:31'),
(29, 8, 'SEO/SEM', '2026-03-10 10:02:31'),
(30, 8, 'Social Media', '2026-03-10 10:02:31'),
(31, 8, 'Content Marketing', '2026-03-10 10:02:31'),
(32, 8, 'Email Campaigns', '2026-03-10 10:02:31');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('8G80yAy8h7jMBu6m2EXSWukCAYh5vHJefcQiPSwl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibkZUTVlhSVZYd0FJRjE5RWdTTFdxbDNzeXkwREtLSnVFMDBYblI2biI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1774439999),
('jgRi0ANNNg7DRLMTBLoxXPwlF11PBhlMNFD1WUFu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS0RTWHFmelFUbjduWENqRHhURVh4Q2R3TndhU3BXU3pFVU5jUHN2QiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773141632),
('JLEOw8AungxhIr9lGmyAtnkmZJoh4s6DNqAaMpgC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQVNhUTlFakdVMndOeWQxZktzYVVrVTh1NElvTmthWHp1NVJsbWYxaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773310566),
('LZCS8XhtnYsQJs5GzEiTe9WFlYeHmn3a8IqsPYPF', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ1JiaXNucmdaNHNRR1FJWWFKTmM0QlEzMVJOdElhOERWMnZhcUZXayI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773214512),
('PRXn56Jd4nPzyX1HK9lr15zF8295eHCIc9c1d8Jb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidWluSndpb2JvZzczM1BvaE1rZWtaeTBkU3ZQaGNTZWpmakZ6cG9CWiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC90ZXN0LW1haWwiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1773404870),
('R72wh1XkLfTOFq3ULvd1CSeXqbyOrZyQOSUxC50G', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUVZ3Tk5zeFlPb2o1eWNKV2c5NTNmQ2ZUc2pDQzNTeGdsckpXYWtzTSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773398151),
('vnt7voh1mB3LJOxzV8EYLoddGJGppKxTlQt7pdBD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicW1xMjlYb3ZBQjNKSUJJT1ZFQVFDOEpKcjNTRXpvY1RwR1VIeEdtcCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773230231);

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `site_name` varchar(100) DEFAULT 'TopTech Solutions',
  `site_logo` varchar(255) DEFAULT NULL,
  `site_favicon` varchar(255) DEFAULT NULL,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_keywords` text DEFAULT NULL,
  `footer_text` text DEFAULT NULL,
  `copyright_text` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `site_name`, `site_logo`, `site_favicon`, `meta_title`, `meta_description`, `meta_keywords`, `footer_text`, `copyright_text`, `created_at`, `updated_at`) VALUES
(1, 'TopTech Solutions', NULL, NULL, 'TopTech - Premium IT Solutions Provider', 'We deliver cutting-edge technology solutions that drive growth, enhance security, and transform your digital presence.', NULL, NULL, NULL, '2026-03-10 10:01:01', '2026-03-10 10:01:01');

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE `statistics` (
  `id` int(11) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `label` varchar(100) NOT NULL,
  `value` int(11) NOT NULL,
  `suffix` varchar(10) DEFAULT '+',
  `order_number` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`id`, `icon`, `label`, `value`, `suffix`, `order_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, '🎯', 'Years Experience', 10, '+', 1, 1, '2026-03-10 10:01:36', '2026-03-10 10:01:36'),
(2, '🤝', 'Happy Clients', 500, '+', 2, 1, '2026-03-10 10:01:36', '2026-03-10 10:01:36'),
(3, '🚀', 'Projects Done', 1000, '+', 3, 1, '2026-03-10 10:01:36', '2026-03-10 10:01:36'),
(4, '⭐', 'Client Satisfaction', 98, '%', 4, 1, '2026-03-10 10:01:36', '2026-03-10 10:01:36'),
(5, '👨‍💻', 'Tech Experts', 50, '+', 5, 1, '2026-03-10 10:01:36', '2026-03-10 10:01:36'),
(6, '🏆', 'Awards Won', 25, '+', 6, 1, '2026-03-10 10:01:36', '2026-03-10 10:01:36');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `expertise` varchar(200) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `social_linkedin` varchar(255) DEFAULT NULL,
  `social_twitter` varchar(255) DEFAULT NULL,
  `social_github` varchar(255) DEFAULT NULL,
  `social_behance` varchar(255) DEFAULT NULL,
  `order_number` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `role`, `expertise`, `image`, `social_linkedin`, `social_twitter`, `social_github`, `social_behance`, `order_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Alex Thompson', 'CEO & Founder', '15+ years in Tech', 'https://randomuser.me/api/portraits/men/1.jpg', '#', '#', NULL, NULL, 1, 1, '2026-03-10 10:03:53', '2026-03-10 10:03:53'),
(2, 'Sarah Chen', 'Lead Developer', 'Full Stack Expert', 'https://randomuser.me/api/portraits/women/2.jpg', '#', '#', NULL, NULL, 2, 1, '2026-03-10 10:03:53', '2026-03-10 10:03:53'),
(3, 'Michael Rodriguez', 'Creative Director', 'UI/UX Specialist', 'https://randomuser.me/api/portraits/men/3.jpg', '#', '#', NULL, NULL, 3, 1, '2026-03-10 10:03:53', '2026-03-10 10:03:53'),
(4, 'Priya Patel', 'AI/ML Engineer', 'Machine Learning', 'https://randomuser.me/api/portraits/women/4.jpg', '#', '#', NULL, NULL, 4, 1, '2026-03-10 10:03:53', '2026-03-10 10:03:53');

-- --------------------------------------------------------

--
-- Table structure for table `technologies`
--

CREATE TABLE `technologies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `technologies`
--

INSERT INTO `technologies` (`id`, `name`, `icon`, `category`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'React', '⚛️', 'Frontend', 1, 1, NULL, NULL),
(2, 'Node.js', '🟢', 'Backend', 2, 1, NULL, NULL),
(3, 'Python', '🐍', 'Backend', 3, 1, NULL, NULL),
(4, 'PHP', '🐘', 'Backend', 4, 1, NULL, NULL),
(5, 'Laravel', '⚡', 'Backend', 5, 1, NULL, NULL),
(6, 'MySQL', '🗄️', 'Database', 6, 1, NULL, NULL),
(7, 'MongoDB', '🍃', 'Database', 7, 1, NULL, NULL),
(8, 'AWS', '☁️', 'DevOps', 8, 1, NULL, NULL),
(9, 'Docker', '🐳', 'DevOps', 9, 1, NULL, NULL),
(10, 'Kubernetes', '⎈', 'DevOps', 10, 1, NULL, NULL),
(11, 'GraphQL', '◉', 'API', 11, 1, NULL, NULL),
(12, 'TypeScript', '🔷', 'Frontend', 12, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `client_role` varchar(100) DEFAULT NULL,
  `client_company` varchar(100) DEFAULT NULL,
  `client_image` varchar(255) DEFAULT NULL,
  `testimonial_text` text NOT NULL,
  `rating` int(11) DEFAULT 5,
  `order_number` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `client_name`, `client_role`, `client_company`, `client_image`, `testimonial_text`, `rating`, `order_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Sarah Johnson', 'CEO', 'TechStart Inc.', 'https://randomuser.me/api/portraits/women/44.jpg', 'TopTech transformed our business with their innovative IT solutions. Their team\'s expertise and dedication are unmatched. They delivered beyond our expectations!', 5, 1, 1, '2026-03-10 10:04:14', '2026-03-10 10:04:14'),
(2, 'Michael Chen', 'CTO', 'InnovateLabs', 'https://randomuser.me/api/portraits/men/32.jpg', 'The best decision we made was partnering with TopTech. Their cloud solutions increased our efficiency by 200%. Highly recommended!', 5, 2, 1, '2026-03-10 10:04:14', '2026-03-10 10:04:14'),
(3, 'Priya Patel', 'Product Manager', 'FinTech Co.', 'https://randomuser.me/api/portraits/women/63.jpg', 'Exceptional service! TopTech\'s team understood our requirements perfectly and delivered a robust solution that scaled with our growth.', 5, 3, 1, '2026-03-10 10:04:14', '2026-03-10 10:04:14'),
(4, 'David Williams', 'Security Head', 'BankCorp', 'https://randomuser.me/api/portraits/men/75.jpg', 'Their cybersecurity expertise saved us from potential threats. Professional, responsive, and technically brilliant team!', 5, 4, 1, '2026-03-10 10:04:14', '2026-03-10 10:04:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','editor') DEFAULT 'editor',
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'xahmedmalik30600@gmail.com', '$2y$12$lQ3/8w0QzUqzLoQh9Uj2KOhtsWg7In7xZAk1meSiwvazO5tBpJZZa', 'admin', NULL, '2026-03-10 09:59:28', '2026-03-25 07:02:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `company_info`
--
ALTER TABLE `company_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cta_section`
--
ALTER TABLE `cta_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hero_section`
--
ALTER TABLE `hero_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_reset` (`user_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `plan_purchases`
--
ALTER TABLE `plan_purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_technologies`
--
ALTER TABLE `portfolio_technologies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portfolio_id` (`portfolio_id`);

--
-- Indexes for table `pricing_features`
--
ALTER TABLE `pricing_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- Indexes for table `pricing_plans`
--
ALTER TABLE `pricing_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `process_steps`
--
ALTER TABLE `process_steps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_features`
--
ALTER TABLE `service_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technologies`
--
ALTER TABLE `technologies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_info`
--
ALTER TABLE `company_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cta_section`
--
ALTER TABLE `cta_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hero_section`
--
ALTER TABLE `hero_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plan_purchases`
--
ALTER TABLE `plan_purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `portfolio_technologies`
--
ALTER TABLE `portfolio_technologies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `pricing_features`
--
ALTER TABLE `pricing_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `pricing_plans`
--
ALTER TABLE `pricing_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `process_steps`
--
ALTER TABLE `process_steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `service_features`
--
ALTER TABLE `service_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `technologies`
--
ALTER TABLE `technologies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `portfolio_technologies`
--
ALTER TABLE `portfolio_technologies`
  ADD CONSTRAINT `portfolio_technologies_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pricing_features`
--
ALTER TABLE `pricing_features`
  ADD CONSTRAINT `pricing_features_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `pricing_plans` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `service_features`
--
ALTER TABLE `service_features`
  ADD CONSTRAINT `service_features_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
