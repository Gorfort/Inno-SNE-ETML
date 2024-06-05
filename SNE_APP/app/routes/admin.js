import express from "express";
import auth from "../auth/auth.js"; // Import du middleware d'authentification
import connection from "../mysql/MySql.js";

const adminRouter = express.Router();

// Permet de vérifier si l'utilisateur possède le bon rôle
function requireRole(requiredRole) {
  return function (req, res, next) {
    const userIsAdmin = req.user.userIsAdmin;
    if (userIsAdmin === requiredRole) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Accès refusé : permissions insuffisantes" });
    }
  };
}

// Route GET pour récupérer tous les utilisateurs
adminRouter.get("/users", auth, requireRole(1), (req, res) => {
  const query = "SELECT idUser, username, email FROM t_user"; // Définition de la requête SQL pour récupérer les informations des utilisateurs

  connection.query(query, (error, result) => {
    if (error) {
      // En cas d'erreur lors de l'exécution de la requête, renvoyer une réponse avec le code 500
      const message =
        "Impossible de récupérer les informations, merci de réessayer plus tard.";
      return res.status(500).json({ message }); // Utilisation de `return` pour s'assurer que la fonction s'arrête ici
    }

    if (result.length === 0) {
      // Si aucun utilisateur n'est trouvé, renvoyer une réponse avec le code 404
      const message = "Aucun utilisateur trouvé.";
      return res.status(404).json({ message }); // Utilisation de `return` pour s'assurer que la fonction s'arrête ici
    } else {
      // Si des utilisateurs sont trouvés, renvoyer les données en JSON
      res.json({ result });
    }
  });
});

export default adminRouter;
