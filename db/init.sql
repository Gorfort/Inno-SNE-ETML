-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db:3306
-- Généré le : mar. 04 juin 2024 à 10:53
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
  `idComments` int NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `fk_User` int NOT NULL,
  `fk_Posts` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `t_comments`
--

INSERT INTO `t_comments` (`idComments`, `comment`, `fk_User`, `fk_Posts`) VALUES
(1, 'Très belle publication hâte de voir le réseaux social', 2, 1),
(2, 'Effectivement très belle deuxième publication', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `t_posts`
--

CREATE TABLE `t_posts` (
  `idPosts` int NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `fk_User` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `t_posts`
--

INSERT INTO `t_posts` (`idPosts`, `title`, `content`, `fk_User`) VALUES
(1, 'Publication test 1', 'Ceci est une publication de test, elle servira à tester notre réseaux social lors de son développement. ', 1),
(2, 'Test publication 2', 'Ceci est une deuxième publication de test, toujours pour tester l\'application lors de son développement', 2);

-- --------------------------------------------------------

--
-- Structure de la table `t_user`
--

CREATE TABLE `t_user` (
  `idUser` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `t_user`
--

INSERT INTO `t_user` (`idUser`, `username`, `password`, `email`, `isAdmin`) VALUES
(1, 'Alessio', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'alessio.lopardo@eduvaud.ch', 0),
(2, 'Admin', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'admin@example.com', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `t_comments`
--
ALTER TABLE `t_comments`
  ADD PRIMARY KEY (`idComments`),
  ADD KEY `fk_User` (`fk_User`),
  ADD KEY `fk_Posts` (`fk_Posts`);

--
-- Index pour la table `t_posts`
--
ALTER TABLE `t_posts`
  ADD PRIMARY KEY (`idPosts`),
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
  MODIFY `idComments` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `t_posts`
--
ALTER TABLE `t_posts`
  MODIFY `idPosts` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `t_user`
--
ALTER TABLE `t_user`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `t_comments`
--
ALTER TABLE `t_comments`
  ADD CONSTRAINT `t_comments_ibfk_1` FOREIGN KEY (`fk_User`) REFERENCES `t_user` (`idUser`),
  ADD CONSTRAINT `t_comments_ibfk_2` FOREIGN KEY (`fk_Posts`) REFERENCES `t_posts` (`idPosts`);

--
-- Contraintes pour la table `t_posts`
--
ALTER TABLE `t_posts`
  ADD CONSTRAINT `t_posts_ibfk_1` FOREIGN KEY (`fk_User`) REFERENCES `t_user` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
