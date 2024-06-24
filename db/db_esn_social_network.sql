-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db:3306
-- Généré le : sam. 15 juin 2024 à 07:26
-- Version du serveur : 8.0.30
-- Version de PHP : 8.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_esn_social_network`
--
CREATE DATABASE IF NOT EXISTS `db_esn_social_network` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `db_esn_social_network`;

-- --------------------------------------------------------

--
-- Structure de la table `t_comments`
--

CREATE TABLE `t_comments` (
  `idComment` int NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `reply_to` int NOT NULL,
  `fk_User` int NOT NULL,
  `fk_Post` int NOT NULL,
  `created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `t_comments`
--

INSERT INTO `t_comments` (`idComment`, `comment`, `reply_to`, `fk_User`, `fk_Post`, `created_At`) VALUES
(1, 'Très belle publication hâte de voir le réseaux social', 0, 2, 1, '2024-06-12 09:04:39'),
(2, 'Effectivement très belle deuxième publication', 0, 1, 2, '2024-06-12 09:04:39'),
(11, 'Pas mal Pas mal', 0, 2, 1, '2024-06-12 09:04:39'),
(12, 'Bonjour', 0, 2, 1, '2024-06-14 13:18:35'),
(13, 'adefr', 0, 1, 1, '2024-06-14 13:29:47'),
(14, 'asdasd', 0, 1, 1, '2024-06-14 14:27:55'),
(15, 'Test de réponse au commentaire n°1', 1, 1, 2, '2024-06-15 07:23:20');

-- --------------------------------------------------------

--
-- Structure de la table `t_posts`
--

CREATE TABLE `t_posts` (
  `idPost` int NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `fk_User` int NOT NULL,
  `created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `t_posts`
--

INSERT INTO `t_posts` (`idPost`, `title`, `content`, `fk_User`, `created_At`) VALUES
(1, 'Publication test 1', 'Ceci est une publication de test, elle servira à tester notre réseaux social lors de son développement. ', 1, '2024-06-12 09:04:16'),
(2, 'Test publication 2', 'Ceci est une deuxième publication de test, toujours pour tester l\'application lors de son développement', 2, '2024-06-12 09:04:16'),
(10, 'Bon bah excrément', 'Bon bah excrément', 1, '2024-06-14 14:15:57'),
(11, 'Crétin', 'Crétin', 1, '2024-06-14 14:23:56');

-- --------------------------------------------------------

--
-- Structure de la table `t_user`
--

CREATE TABLE `t_user` (
  `idUser` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT 'not_verified',
  `created_At` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `t_user`
--

INSERT INTO `t_user` (`idUser`, `username`, `password`, `email`, `isAdmin`, `status`, `created_At`) VALUES
(1, 'Alessio', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'alessio.lopardo@eduvaud.ch', 0, 'not_verified', '2024-06-12 09:20:43'),
(2, 'Admin', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'admin@example.com', 1, 'not_verified', '2024-06-12 09:20:43'),
(3, 'Kent1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'quentin.metroz@eduvaud.ch', 0, 'not_verified', '2024-06-12 09:20:43'),
(4, 'Gorfort', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'thibaud.racine@eduvaud.ch', 0, 'not_verified', '2024-06-12 09:20:43');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `t_comments`
--
ALTER TABLE `t_comments`
  ADD PRIMARY KEY (`idComment`),
  ADD KEY `fk_User` (`fk_User`),
  ADD KEY `fk_Posts` (`fk_Post`);

--
-- Index pour la table `t_posts`
--
ALTER TABLE `t_posts`
  ADD PRIMARY KEY (`idPost`),
  ADD KEY `fk_User` (`fk_User`);

--
-- Index pour la table `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `t_comments`
--
ALTER TABLE `t_comments`
  MODIFY `idComment` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `t_posts`
--
ALTER TABLE `t_posts`
  MODIFY `idPost` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `t_user`
--
ALTER TABLE `t_user`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `t_comments`
--
ALTER TABLE `t_comments`
  ADD CONSTRAINT `t_comments_ibfk_1` FOREIGN KEY (`fk_User`) REFERENCES `t_user` (`idUser`),
  ADD CONSTRAINT `t_comments_ibfk_2` FOREIGN KEY (`fk_Post`) REFERENCES `t_posts` (`idPost`);

--
-- Contraintes pour la table `t_posts`
--
ALTER TABLE `t_posts`
  ADD CONSTRAINT `t_posts_ibfk_1` FOREIGN KEY (`fk_User`) REFERENCES `t_user` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
