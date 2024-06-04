import express from "express";
import https from "node:https";
import fs from "node:fs";
import connection from "./mysql/MySql.js";
import cors from "cors";

// Instancie express
const app = express();

// Permet d'afficher du json
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // URL correspondant au FrontEnd
    methods: ["GET", "POST", "PUT", "DELETE"], // Les méthodes HTTP qui sont autorisé
    allowedHeaders: ["Content-Type", "Authorization"], // Les en-têtes qui sont autorisé
    credentials: true, // Ceci est nécessaire pour les cookies, les sessions HTTP ou les en-têtes d'authentification
    optionsSuccessStatus: 200, // Renvoie le status 200 pour les requetes terminées avec succès
  })
);

// Connection avec la base de données
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// //Options qui appelent le certificat ssl
// const options = {
//   key: fs.readFileSync("./certificates/key.key"),
//   cert: fs.readFileSync("./certificates/cert.cert"),
// };

// // Démarrage du serveur avec le certificat ssl (HTTPS)
// https.createServer(options, app).listen(443);

// Routes pour les publications
import postRouter from "./routes/post.js";
app.use("/post", postRouter);

// Routes pour les Admins
import adminRouter from "./routes/admin.js";
app.use("/admin", adminRouter);

// Routes pour les commentaires
import commentRouter from "./routes/comment.js";
app.use("/comment", commentRouter);

// Route qui permet de voir les users
import userRouter from "./routes/User.js";
app.use("/user", userRouter);

// Route qui permet de se login
import loginRouter from "./routes/login.js";
app.use("/login", loginRouter);

// Démarrage du serveur en HTTP
app.listen(443);
