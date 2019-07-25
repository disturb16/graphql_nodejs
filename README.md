# Instalation and usage
1. First install dependencies `npm install`
2. Set up your env variables
3. Then run `node server.js` 
4. After that you can go to *localhost:3030/graphql* 

# Schema
This is the basic schema used in this demo

```
CREATE DATABASE blog;

USE blog;

CREATE TABLE `AUTHORS` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `POSTS` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` varchar(100) NOT NULL,
  `author_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `POSTS_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `AUTHORS` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `COMMENTS` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `post_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `COMMENTS_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `POSTS` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```