// Importation des dépendances nécessaires
import express from "express";
import connection from "../mysql/MySql.js"; // Connexion à la base de données MySQL
import { compareHashPassword } from "../auth/crypto.js"; // Fonction pour comparer les mots de passe hashés
import jwt from "jsonwebtoken"; // Pour générer des tokens JWT
import privateKey from "../auth/private_key.js"; // Clé privée pour signer le JWT

// Création du routeur pour les requêtes de connexion
const loginRouter = express.Router();

// Route POST pour gérer les tentatives de connexion
loginRouter.post("/", (req, res) => {
  const { username, password } = req.body;

  // Vérification si le champ username ou password est vide
  if (!username || !password) {
    return res.status(400).json({
      message: "Les champs 'username' et 'password' ne peuvent pas être vides.",
    });
  }

  // Utilisation de requêtes préparées pour prévenir l'injection SQL
  const query = `SELECT * FROM t_user WHERE username = ?`;
  connection.query(query, [username], (error, users) => {
    if (error) {
      // Log de l'erreur et réponse avec un message d'erreur générique
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }

    // Vérification si aucun utilisateur n'est trouvé
    if (users.length === 0) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const user = users[0];
    console.log(user);
    const hashedPassword = user.password;

    // Comparaison du mot de passe envoyé avec le mot de passe hashé stocké
    const isPasswordCorrect = compareHashPassword(password, hashedPassword);
    if (isPasswordCorrect) {
      // Si les mots de passe correspondent, générer un token JWT
      const token = jwt.sign(
        { userId: user.idUser, userIsAdmin: user.isAdmin },
        privateKey,
        {
          expiresIn: "1y", // Le token expire en 1 an
        }
      );
      return res.json({
        message: "L'utilisateur a été connecté avec succès.",
        token,
      });
    } else {
      // Si les mots de passe ne correspondent pas
      return res
        .status(401)
        .json({ message: "Le mot de passe est incorrect." });
    }
  });
});

// Exportation du routeur pour utilisation dans d'autres parties de l'application
export default loginRouter;
