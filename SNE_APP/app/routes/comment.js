import express, { response } from "express";
import auth from "../auth/auth.js"; // Import du middleware d'authentification
import connection from "../mysql/MySql.js";

const commentRouter = express.Router();

// Route pour récupérer tous les commentaires
commentRouter.get("/", auth, (req, res) => {
  const query =
    "SELECT idComment, comment, t_user.username, t_posts.title as Post_title, t_posts.content as post_content FROM t_comments JOIN t_posts ON t_posts.idPost = t_comments.fk_Post JOIN t_user ON t_user.idUser = t_comments.fk_User ";
  connection.query(query, (error, result) => {
    if (error) {
      const message = "Erreur du serveur interne, veuillez ressayer plus tard";
      console.log(error);
      return res.status(500).json({ message });
    }
    if (result.length === 0) {
      const message = "Aucun commentaire trouvé";
      return res.status(404).json({ message });
    } else {
      return res.json({ result });
    }
  });
});

// Route qui permet de récupérer toutes les réponse à un commentaire
commentRouter.get("/:id/comments", auth, (req, res) => {
  const query =
    "SELECT * FROM t_comments JOIN t_posts ON t_posts.idPost = t_comments.fk_Post JOIN t_user ON t_user.idUser = t_comments.fk_User WHERE reply_to = ?";
  connection.query(query, [req.params.id], (error, result) => {
    if (error) {
      const message = "Erreur du serveur interne, veuillez ressayer plus tard.";
      return res.status(500).json({ messagee });
    }
    if (result.length === 0) {
      const message = "Aucun commentaire trouvé";
      return res.status(404).json({ message });
    } else {
      return res.json({ result });
    }
  });
});

// Route pour récupérer un commentaire selon son ID
commentRouter.get("/:id", auth, (req, res) => {
  const query =
    "SELECT idComment, comment, t_user.username, t_posts.title as Post_title, t_posts.content as post_content FROM t_comments JOIN t_posts ON t_posts.idPost = t_comments.fk_Post JOIN t_user ON t_user.idUser = t_comments.fk_User WHERE idComment = ?";
  connection.query(query, [req.params.id], (error, result) => {
    if (error) {
      const message = "Erreur du serveur interne, veuillez ressayer plus tard.";
      return res.status(500).json({ message });
    }

    if (result.length === 0) {
      const message = "Aucun commentaire trouvé";
      return res.status(404).json({ message });
    } else {
      return res.json({ result });
    }
  });
});

// Route pour poster un commentaire
commentRouter.post("/", auth, (req, res) => {
  if (!req.body.comment || !req.body.fk_Post) {
    return res
      .status(400)
      .json({ message: "Le commentaire et le post sont obligatoire" });
  }

  const query =
    "INSERT INTO `t_comments`(`comment`, `fk_Post`, `fk_User`) VALUES (?,?,?)";
  connection.query(
    query,
    [req.body.comment, req.body.fk_Post, req.user.userId],
    (error, result) => {
      if (error) {
        const message =
          "Erreur du serveur interne, Veuillez ressayer plus tard";
        return res.status(500).json({ message });
      } else {
        console.log(result);
        res.json({ message: "Le commentaire à bien été crée" });
      }
    }
  );
});

commentRouter.put("/:id", auth, (req, res) => {
  const query = "UPDATE `t_comments` SET `comment`= ? WHERE idComment = ? ";
  connection.query(
    query,
    [req.body.comment, req.params.id],
    (error, result) => {
      if (error) {
        const message =
          "Erreur du serveur interne, veuillez ressayer plus tard.";
        res.status(500).json({ message });
      } else {
        console.log(result);
        res.json({ message: "La publication à bien été modifiée" });
      }
    }
  );
});

commentRouter.delete("/:id", auth, (req, res) => {
  const query = "DELETE FROM `t_comments` WHERE idComment = ?";
  connection.query(query, [req.params.id], (error, result) => {
    if (error) {
      const message = "Erreur du serveur interne, Veuillez ressayer plus tard";
      return res.status(500).json({ message });
    }

    if (result.affectedRows === 0) {
      const message = "Aucun posts trouvé";
      return res.status(404).json({ message });
    } else {
      console.log(result);
      res.json({ message: "La publication à bien été suprimée" });
    }
  });
});

export default commentRouter;
