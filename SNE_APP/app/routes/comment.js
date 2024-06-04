import express from "express";
import auth from "../auth/auth.js"; // Import du middleware d'authentification
import connection from "../mysql/MySql.js";

const commentRouter = express.Router();

commentRouter.get("/", auth, (req, res) => {});
commentRouter.get("/:id", auth, (req, res) => {});

commentRouter.post("/", auth, (req, res) => {});
commentRouter.put("/", auth, (req, res) => {});

commentRouter.delete("/", auth, (req, res) => {});

export default commentRouter;
