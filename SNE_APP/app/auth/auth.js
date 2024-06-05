import jwt from "jsonwebtoken";
import privateKey from "../auth/private_key.js";

const auth = (req, res, next) => {
  // Extraction de l'en-tête d'autorisation de la requête
  const authorizationHeader = req.headers.authorization;

  // Vérification de la présence de l'en-tête d'autorisation
  if (!authorizationHeader) {
    const message =
      "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en dans l'en-tête de la requête.";
    // Envoi d'une réponse 401 si le jeton n'est pas fourni
    return res.status(401).json({ message });
  } else {
    // Extraction du jeton de l'en-tête. Le format attendu est "Bearer [token]"
    const token = authorizationHeader.split(" ")[1];

    // Décodage et vérification du jeton
    const decodedToken = jwt.verify(
      token,
      privateKey,
      (error, decodedToken) => {
        // Gestion des erreurs de vérification du jeton
        if (error) {
          const message =
            "L'utilisateur n'est pas autorisé à accéder à cette ressource.";
          // Envoi d'une réponse 401 si le jeton est invalide
          return res.status(401).json({ message, data: error });
        }
        // Récupération de l'userId depuis le jeton décodé
        const userId = decodedToken.userId;
        // Vérification de la concordance de l'userId si fourni dans le corps de la requête
        if (req.body.userId && req.body.userId !== userId) {
          const message = "L'identifiant de l'utilisateur est invalide";
          // Envoi d'une réponse 401 si l'userId ne correspond pas
          return res.status(401).json({ message });
        } else {
          // Passage des information du decoded token à req.user
          req.user = decodedToken;
          // Passage au middleware suivant si le jeton est valide et les userId correspondent
          next();
        }
      }
    );
  }
};

export default auth;
