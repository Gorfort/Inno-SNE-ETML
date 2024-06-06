import mysql from "mysql2";

// Crée une nouvelle connexion à la base de données
const connection = mysql.createConnection({
  host: "db",
  port: "3306",
  user: "root",
  password: "root",
  database: "db_esn_social_network",
});

export default connection;
