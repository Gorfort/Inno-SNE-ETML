import express from "express";
import connection from "../mysql/MySql.js";
import { hashPassword } from "../auth/crypto.js";

const signinRouter = express.Router();

signinRouter.post("/", (req, res) => {
  // Récupère username et password de req.body
  const { username, password, email } = req.body;

  // Renvoie une erreur si l'utilisateur ne remplie pas les champs requis
  if (!username || !password || !email) {
    const message = "Le username, l'email et le mot de passe sont des champs obligatoire.";
    return res.status(400).json({ message });
  }

  // Hash le mot de passe
  const hashedPassword = hashPassword(password);

  const query =
    "INSERT INTO `t_user`(`username`, `password`, `email`) VALUES (?,?,?)";
  connection.query(
    query,
    [username, hashedPassword, email],
    (error, result) => {
      if (error) {
        const message = "Erreur du serveur interne, veuillez ressayer plus tard.";
        return res.status(500).json({ message });
      } else {
        return res.json({ message: "L'utilisateur à été créer avec succès" });
      }
    }
  );
});

export default signinRouter;
