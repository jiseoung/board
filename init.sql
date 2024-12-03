DROP USER IF EXISTS 'root'@'%';

CREATE USER 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

DROP DATABASE IF EXISTS `board_db`;

CREATE DATABASE `board_db`;

USE `board_db`;

DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `board`;
DROP TABLE IF EXISTS `manage_view`;
DROP TABLE IF EXISTS `good_bad`;
DROP TABLE IF EXISTS `comment`;

CREATE TABLE `users` (
	`id` varchar(255) NOT NULL primary key,
	`pw` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`email`	varchar(255) NOT NULL,
	`role` int NOT NULL DEFAULT 0
);

CREATE TABLE `board` (
	`index`	int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`username` varchar(255) NOT NULL,
	`title`	varchar(255) NOT NULL,
	`content` varchar(255) NOT NULL,
	`file_name`	varchar(255) NULL,
	`date` datetime NOT NULL,
	`secret` TINYINT(1) NOT NULL DEFAULT  0,
	`view` int NOT NULL DEFAULT 0,
	`good` int NOT NULL DEFAULT  0,
	`bad` int NOT NULL DEFAULT  0,
	`report` TINYINT(1) NULL DEFAULT  0,
	`modify` TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE `manage_view` (
	`board_index` int NOT NULL,
	`username` varchar(255) NOT NULL
);

CREATE TABLE `good_bad` (
	`board_index` int NOT NULL,
	`username` varchar(255) NOT NULL,
	`good` int NOT NULL DEFAULT 0,
	`bad` int NOT NULL DEFAULT 0
);

CREATE TABLE `comment` (
	`board_index` int NOT NULL,
	`com_index` int NOT NULL AUTO_INCREMENT primary key,
	`parent_index` int NULL,
	`depth` int NOT NULL DEFAULT 0,
	`username` varchar(255) NOT NULL,
	`content` varchar(255) NOT NULL,
	`date` datetime NOT NULL,
	`secret` TINYINT(1) NOT NULL DEFAULT 0,
	`edit` TINYINT(1) NOT NULL DEFAULT 0
);