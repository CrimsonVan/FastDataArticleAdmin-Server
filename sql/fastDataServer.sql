-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: my_db_01
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ev_article_cate`
--

DROP TABLE IF EXISTS `ev_article_cate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_article_cate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(255) NOT NULL,
  `cate_alias` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`cate_name`),
  UNIQUE KEY `alias_UNIQUE` (`cate_alias`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_article_cate`
--

LOCK TABLES `ev_article_cate` WRITE;
/*!40000 ALTER TABLE `ev_article_cate` DISABLE KEYS */;
INSERT INTO `ev_article_cate` VALUES (1,'科技','Tec',0),(2,'历史','history',0),(3,'艺术','art',0),(4,'美术','meishu',0),(5,'电影','film',0);
/*!40000 ALTER TABLE `ev_article_cate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_articles`
--

DROP TABLE IF EXISTS `ev_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `cover_img` varchar(255) NOT NULL,
  `pub_date` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  `cate_id` int NOT NULL,
  `author_id` int DEFAULT NULL,
  `cate_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_articles`
--

LOCK TABLES `ev_articles` WRITE;
/*!40000 ALTER TABLE `ev_articles` DISABLE KEYS */;
INSERT INTO `ev_articles` VALUES (1,'编辑文章333','<p>dasddasasds</p>','\\uploads\\6e09433cdfa7589bfad69fcc3d5cd495','2024-09-04 04:41:41.420','已发布',0,2,4,'历史'),(2,'222222','沙发沙发沙发','\\uploads\\0a432dca55ff33c4b684c58c7b668127','2024-09-04 01:16:23.351','已发布',0,2,4,NULL),(4,'121112','<p>212212</p>','\\uploads\\2be9f170234d8598a7b3ff0b170fb417','2024-09-04 04:42:32.492','已发布',0,1,4,'科技'),(8,'121','<p>23123233</p>','\\uploads\\5500ed45c20a70ecee5ff06a5e67a2c4','2024-09-04 04:20:40.486','已发布',0,2,4,NULL);
/*!40000 ALTER TABLE `ev_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_users`
--

DROP TABLE IF EXISTS `ev_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_pic` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_users`
--

LOCK TABLES `ev_users` WRITE;
/*!40000 ALTER TABLE `ev_users` DISABLE KEYS */;
INSERT INTO `ev_users` VALUES (1,'阿飞','098123','嘿嘿','23223@qq.com',NULL),(3,'蜘蛛侠','$2a$10$nS.vwhHm2dsLO.nNZ3PD1.cgNuG.KVNhO3GYwFmrqAMGeUKDvV.e6',NULL,NULL,NULL),(4,'crimsonvan','$2a$10$hNrorwLm7pi9EnidAxHNGOfH22XR4Fsk0yNRYJhJNA8EE7xS0H83O','红色面包车','2329016851@qq.com','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAohJREFUaEPtmYttwjAQhv90kTZ0kMIkwCTQSaCTlA5Ski5CygVbMontu7MNCCmRqqqKY99373MrPPlTPbn8mAAebcHJApMFMjVQ3IUa4M3IZH/Tn20NtJmyej/PBjACzwG8dsA2ImTbAYcX4KcG9qVgkgGM4EtG6JCcbXWB+Mq1TBJAA2wSBR8C9SA18JlqETXAEfgGQC5T8jnMgEXKhmIAcpkO2CmEp6ClHyksWWOhdSkxgEbzFbC2gWrAG6F22xlQC9f2y0QAGuFp09lgX+X3KndiARpgZVxHpJgO2L8Da3exdo+zUFtpYLMAR4DM7xalKEgJAIodaTxEAVLSZSEA+PbxaS4KcATto3tKAZAVJAEdBND6rcUsCEAZhtLqIabCIMAvsKuAlU7/vcmyg9g5k81IQQBt8N7CAhI3igGE/N82Yn8B61DrfGV2p2P1fnICPkLWroA6Vp1VAG6F1boWtz5Usbk48AI0wLy7NG1Xz7DCckJp3/sqdioANW6j/oXbTCvwcL0v7rgzQxbwAkiLSwpIqGgWjQEjWD8ahoT0jYzkkidgGfomlq5zAJIGl8J1YNTZDpUQq8RJY2NJAInLxgC8mYjz75IAkrQdA/AG8j0BJGmba6dVwwzBlbKAdKjhALSDfDEAifZJYexEltBWjzpI7R4S37euzALQQuVkNhpEHjrUGwCVK5H/0rWh0ZLm+pHt/8V1YLgw8y6US170Xi28KAbck28FISlYkTZEopzrNSYoN5rrlsAp97/ctYI41qC5WXxvZBvC3FtpVRbibOTA0EVu6DLXjqL0D47oTQN3nvtelEY1G9qsZb/R3jZrz7oJgFaInPUTQI72Snw7WaCEFnP2+Acupf0xgwaU4wAAAABJRU5ErkJggg==');
/*!40000 ALTER TABLE `ev_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-04  4:50:23
