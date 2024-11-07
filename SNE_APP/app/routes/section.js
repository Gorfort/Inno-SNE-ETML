import express from "express";
import auth from "../auth/auth.js"; // Import du middleware d'authentification
import connection from "../mysql/MySql.js";

const sectionRouter = express.Router();

// Route pour récupérer tous les commentaires
sectionRouter.get("/", auth, (req, res) => {
  const query = "SELECT * FROM t_section";
  connection.query(query, (error, result) => {
    if (error) {
      const message = "Erreur du serveur interne, veuillez ressayer plus tard";
      console.log(error);
      return res.status(500).json({ message });
    }

    return res.status(200).json({ message: "Voici toute les sections existante", data: result })
  });
});

sectionRouter.get('/:id', auth, (req, res) => {
    const query = `SELECT * FROM t_section WHERE id=?`
    connection.query(query, [req.params.id], (error, result) => {
        if(error) {
            const message = "Erreur du serveur interne, veuillez ressayer plus tard";
            console.log(error);
            return res.status(500).json({ message });
        }

        return res.status(200).json({ message: "Voici la section demandé", data: result })
    })
})

sectionRouter.get("/name/:name", auth, (req, res) => {
    const query = `SELECT * FROM t_section WHERE name=?`
    connection.query(query, [req.params.name], (error, result) => {
        if(error) {
            const message = "Erreur du serveur interne, veuillez ressayer plus tard";
            console.log(error);
            return res.status(500).json({ message });
        }

        return res.status(200).json({ message: "Voici la section demandé", data: result })
    })
});

sectionRouter.post("/", auth, (req, res) => {
    const { name } = req.body
    const query = `INSERT INTO t_section(name) VALUES (?)`
    connection.query(query, [name], (error, _) => {
        if(error) {
            const message = "Erreur du serveur interne, veuillez ressayer plus tard";
            console.log(error);
            return res.status(500).json({ message });
        }

        return res.status(200).json({ message: "La section a été ajouté avec succès" })
    })
})

sectionRouter.put("/:id", auth, (req, res) => {
    const id = req.params.id
    const { name } = req.query
    let query = `SELECT * FROM t_section WHERE id=?`
    connection.query(query, [id], (error, result) => {
        if(error) {
            const message = "Erreur du serveur interne, veuillez ressayer plus tard";
            console.log(error);
            return res.status(500).json({ message });
        }

        if(!result) {
            const message = "Erreur : Cette section n'existe pas"
            return res.status(404).json({ message })
        }

        query = `UPDATE t_section SET name=? WHERE id=?`
        connection.query(query, [name, id], (error, _) => {
            if(error) {
                const message = "Erreur du serveur interne, veuillez ressayer plus tard";
                console.log(error);
                return res.status(500).json({ message });
            }

            return res.status(200).json({ message: "Le nom a bien été mis à jour" })
        })
    })
})

export default sectionRouter;
