import express from "express";
import auth from "../auth/auth.js"; // Import du middleware d'authentification
import connection from "../mysql/MySql.js";

const postRouter = express.Router();

// Route qui permet de récupérer toutes les publications
postRouter.get("/", auth, (req, res) => {
  // Query MySQL pour récupérer tous les posts
  const query =
    "SELECT idPost, title, content, t_user.username FROM t_posts JOIN t_user ON t_user.idUser = t_posts.fk_User";

  // Récupérer tous les posts grâce à la connexion avec la DB
  connection.query(query, (error, result) => {
    if (error) {
      const message = "Erreur du serveur interne, veuillez ressayer plus tard.";
      console.log(error);
      return res.status(500).json({ message });
    }

    if (result.length === 0) {
      const message = "Aucun posts trouvé";
      return res.status(404).json({ message });
    } else {
      return res.json({ data: result });
    }
  });
});

// Route qui permet de récupérer une publication selon son id
postRouter.get("/:id", auth, (req, res) => {
  const query =
    "SELECT idPost, title, content, t_user.username FROM t_posts JOIN t_user ON t_user.idUser = t_posts.fk_User WHERE idPost = ?";
  connection.query(query, [req.params.id], (error, result) => {
    if (error) {
      const message = "Erreur du serveur interne, veuillez ressayer plus tard.";
      return res.status(500).json({ message });
    }

    if (result.length === 0) {
      const message = "Aucun posts trouvé";
      return res.status(404).json({ message });
    } else {
      return res.json({ data: result });
    }
  });
});

// Routess qui permet de récupérer tous les commentaire selon la publication
postRouter.get("/:id/comments", auth, (req, res) => {
  const query =
    "SELECT t_comments.idComment, t_comments.comment, t_user.username FROM t_comments JOIN t_user ON t_comments.fk_User = t_user.idUser WHERE t_comments.fk_Post = ?";

  connection.query(query, [req.params.id], (error, result) => {
    if (error) {
      const message =
        "Erreur du serveur interne, veuillez réessayer plus tard.";
      console.log(error);
      return res.status(500).json({ message });
    }

    if (result.length === 0) {
      const message = "Aucun commentaire trouvé pour cette publication";
      return res.status(404).json({ message });
    } else {
      return res.json({ result });
    }
  });
});

// Route qui permet de mettre à jour une publication
postRouter.put("/:id", auth, (req, res) => {
  const query =
    "UPDATE `t_posts` SET `title`= ?,`content`= ? WHERE idPost = ? ";
  connection.query(
    query,
    [req.body.title, req.body.content, req.params.id],
    (error, result) => {
      if (error) {
        const message =
          "Erreur du serveur interne, veuillez ressayer plus tard.";
        res.status(500).json({ message });
      } else {
        res.json({ message: "La publication à bien été modifiée" });
      }
    }
  );
});

// Routes qui permet d'ajouter une publication
postRouter.post("/", auth, (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res
      .status(400)
      .json({ message: "Le titre et le contenu sont obligatoire" });
  }

  const query =
    "INSERT INTO `t_posts`(`title`, `content`, `fk_User`) VALUES (?,?,?)";
  connection.query(
    query,
    [req.body.title, req.body.content, req.user.userId],
    (error, result) => {
      if (error) {
        const message =
          "Erreur du serveur interne, Veuillez ressayer plus tard";
        return res.status(500).json({ message });
      } else {
        res.json({ message: "La publication à bien été créee" });
      }
    }
  );
});

// Routes qui permet de supprimer une publication
postRouter.delete("/:id", auth, (req, res) => {
  const query = "DELETE FROM `t_posts` WHERE idPost = ?";
  connection.query(query, [req.params.id], (error, result) => {
    if (error) {
      const message = "Erreur du serveur interne, Veuillez ressayer plus tard";
      return res.status(500).json({ message });
    }

    if (result.affectedRows === 0) {
      const message = "Aucun posts trouvé";
      return res.status(404).json({ message });
    } else {
      res.json({ message: "La publication à bien été suprimée" });
    }
  });
});

export default postRouter;
