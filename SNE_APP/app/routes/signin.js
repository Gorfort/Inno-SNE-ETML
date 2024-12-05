import express from "express";
import connection from "../mysql/MySql.js";
import { hashPassword } from "../auth/crypto.js";

const signinRouter = express.Router();

signinRouter.post("/", (req, res) => {
  // Récupère username et password de req.body
  const { username, password, email, section } = req.body;

  console.log(username, password, email, section)

  // Renvoie une erreur si l'utilisateur ne remplie pas les champs requis
  if (!username || !password || !email || !section) {
    const message = "Le username, l'email , le mot de passe et la section sont des champs obligatoire.";
    return res.status(400).json({ message });
  }

  // Hash le mot de passe
  const hashedPassword = hashPassword(password);

  const query =
    "INSERT INTO `t_user`(`username`, `password`, `email`, `idSection`) VALUES (?,?,?,?)";
  connection.query(
    query,
    [username, hashedPassword, email, section],
    (error, result) => {
      if (error) {
        const message = "Erreur du serveur interne, veuillez ressayer plus tard.";
        console.log(error)
        return res.status(500).json({ message });
      } else {
        return res.json({ message: "L'utilisateur à été créer avec succès" });
      }
    }
  );
});

export default signinRouter;
