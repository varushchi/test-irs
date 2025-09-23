import express from "express";
import { getAllAuthors, getAuthor, createAuthor, changeAuthor, deleteAuthor, getAuthorBooks } from "../controllers/authorControllers.js";

const authorRouter = express.Router();

authorRouter.get("/", getAllAuthors)

authorRouter.get("/:id", getAuthor)

authorRouter.post("/", createAuthor)

authorRouter.put("/:id", changeAuthor)

authorRouter.delete("/:id", deleteAuthor)

authorRouter.get("/:id/books", getAuthorBooks)

export default authorRouter;

