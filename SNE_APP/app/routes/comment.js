import express from "express";
import auth from "../auth/auth.js"; // Import du middleware d'authentification
import connection from "../mysql/MySql.js";

const commentRouter = express.Router();

export default commentRouter;
