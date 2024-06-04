import { Sequelize, DataTypes } from "sequelize";
import { ProductModel } from "../models/products.mjs";

const sequelize = new Sequelize(
  "db_products", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    logging: false,
  }
);
import { products } from "./mock-product.mjs";
// Le modèle product
const Product = ProductModel(sequelize, DataTypes);
let initDb = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données qui vons pas
    .then((_) => {
      //import les modification
      importProducts();
      console.log("La base de données db_products a bien été synchronisée");
    });
};
const importProducts = () => {
  // import tous les produits présents dans le fichier db/mock-product
  products.map((product) => {
    //créé les produit
    Product.create({
      name: product.name,
      price: product.price,
    }).then((product) => console.log(product.toJSON()));
  });
};
export { sequelize, initDb, Product };
