-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: tododb
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `id` varchar(36) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(256) NOT NULL,
  `dateOfCompletion` datetime NOT NULL,
  `status` enum('new','complete') NOT NULL DEFAULT 'new',
  `userId` varchar(36) DEFAULT NULL,
  `dateOfCreation` datetime NOT NULL,
  `dateOfModification` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1e982e43f63a98ad9918a86035c` (`userId`),
  CONSTRAINT `FK_1e982e43f63a98ad9918a86035c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
INSERT INTO `todo` VALUES ('079185f2-7e6f-451f-9e4c-feb055826cfd','Finish writting Postman','I need to finnish writting the postman file to describe the APIs in my application. ','2022-02-05 12:00:00','new','f937033a-7a57-46ac-95f5-913c27bcc457','2022-02-04 20:18:36','2022-02-04 20:18:36'),('4b93f655-e8f3-4964-bb17-de218347220b','Go get some groceries from CO.OP MART','I have to go pick up some veggies and fruits at the local supermarket coopmart.','2022-02-05 04:00:00','new','f937033a-7a57-46ac-95f5-913c27bcc457','2022-02-05 21:39:48','2022-02-05 21:55:40'),('a19191bf-24ce-41e5-9e4a-28b609179394','Go get some groceries from CO.OP MART','I have to go pick up some veggies and fruits at the local supermarket coopmart.','2022-02-05 04:00:00','complete','4235a09f-aa1f-4fe7-bded-a76261a32f57','2022-02-04 22:54:36','2022-02-04 22:55:42'),('a7f196f6-dd32-4574-a253-fe2ff7ad1375','Attend rubic contest','I need to remember to enter the rubic contest 8am tommorow. I should bring a spare rubic cube.','2022-02-03 04:00:00','new','879a6090-d764-4024-b0d1-525b7ee953da','2022-01-31 18:29:16','2022-02-01 04:33:16'),('ca0c1db8-b69f-45c3-96bf-d2fac2335004','Play game','I need to remember to play valorant for at least 1 hour','2022-02-09 15:45:00','complete','f937033a-7a57-46ac-95f5-913c27bcc457','2022-02-01 15:45:29','2022-02-01 15:45:29');
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-05 22:17:19
