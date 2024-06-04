import express from "express";
import { Product } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { ValidationError } from "sequelize";

const productsRouter = express();

productsRouter.get("/", (req, res) => {
  Product.findAll()
    .then((products) => {
      const message = "La liste des produits a bien été récupérée.";
      res.json(success(message, products));
    })
    .catch((error) => {
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

productsRouter.get("/:id", (req, res) => {
  // findByPk => retourne le produit dont l'id vaut req.params.id
  // SELECT * FROM Products WHERE id = '3'
  // findByPk est une promesse JS
  Product.findByPk(req.params.id)
    .then((product) => {
      if (product === null) {
        const message = "le produit n'existe pas (a cause de nima)";
        // sa return le message d'erreur
        return res.status(404).json({ message });
      }
      const message = `Le produit dont l'id vaut ${product.id} existe, et il est la`;
      res.json(success(message, product));
    })
    //met l'erreur si il y'a une erreur serveur
    .catch((error) => {
      const message = "sa fonction pas, c'est ta faute";
      res.status(500).json({ message, data: error });
    });
});

productsRouter.post("/", (req, res) => {
  //create est une promesse, elle permet de créé un objet avec les info que l'utilisateur a mis
  Product.create(req.body)
    .then((createdProduct) => {
      //defini le message
      const message = `le produit ${createdProduct.name} a bien été créé`;
      // Retourner la réponse HTTP en json avec le msg et le produit créé
      res.json(success(message, createdProduct));
      //affiche une erreur si le produit ne peux pas etre ajouter
    })
    .catch((error) => {
      //met les erreur avec le system de products
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "le produit ne peux etre ajouter, rééssais (c'est ta faute)";
      console.log(error);
      return res.status(500).json({ message, data: error });
    });
});

productsRouter.delete("/:id", (req, res) => {
  // findByPk => retourne le produit dont l'id vaut req.params.id
  // SELECT * FROM Products WHERE id = '3'
  // findByPk est une promesse JS

  Product.findByPk(req.params.id).then((deletedProduct) => {
    //met un message d'erreur si le produit existe pas
    if (deletedProduct === null) {
      const message =
        "le produit n'existe pas, donc pas supprimable (a cause de nima)";
      return res.status(404).json({ message });
    }
    //destroy est une promesse qui vas delet le produit avec l'id corespondant
    return Product.destroy({
      where: { id: deletedProduct.id },
    })
      .then((_) => {
        //message
        const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
        //retourne la réponse
        res.json(success(message, deletedProduct));
      })
      .catch((error) => {
        const message = "le produit la pa pu etre supp, rééssais (ta faute)";
        res.status(500).json({ message, data: error });
      });
  });
});

productsRouter.put("/:id", (req, res) => {
  //product update est une promesse, il vas récum l'id et faire  un modification sur le produit corespondant avec les info
  //que l'utilisateur a mis
  const productId = req.params.id;
  Product.update(req.body, { where: { id: productId } })
    .then((_) => {
      // findByPk => retourne le produit dont l'id vaut req.params.id
      // SELECT * FROM Products WHERE id = '3'
      // findByPk est une promesse JS
      Product.findByPk(productId).then((updatedProduct) => {
        if (updatedProduct === null) {
          const message = "le produit n'existe pas (a cause de nima)";
          //retourne le message d'erreur
          return res.status(404).json({ message });
        }
        const message = `Ré prodaut dont l'ien vui a ${productId} bid éré rétupéle`;
        res.json(success(message, updatedProduct));
      });
    })
    .catch((error) => {
      const message =
        "le prodzit na pas pu mettre mis a jours a cause de toi, rééessais";
      //met l'erreur avec le message (erreur serveur)
      res.status(500).json({ message, data: error });
    });
});
//get product est sensé retourné le produit tel qu'il est acuellement

export { productsRouter };
