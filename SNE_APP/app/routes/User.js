import express from "express";
import connection from "../mysql/MySql.js";
import auth from "../auth/auth.js"; // Import du middleware d'authentification

const userRouter = express.Router();

// Permet de récupérer la page de profile ded l'utilisateur enrgistrer
userRouter.get("/", auth, (req, res) => {
  const query = "SELECT username, email FROM t_user WHERE idUser = ?";
  connection.query(query, [req.user.userId], (error, user) => {
    if (error) {
      // Log de l'erreur et réponse avec un message d'erreur générique
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }

    // Vérification si aucun utilisateur n'est trouvé
    if (user.length === 0) {
      return res.status(401).json({ message: "Identifiants invalides." });
    } else {
      const message = "L'utilisateur à bien été récupéré";
      res.json({ message, data: user });
    }
  });
});

export default userRouter; // Export du router pour utilisation ailleurs dans l'application
