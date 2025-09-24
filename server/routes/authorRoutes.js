import express from "express";
import { getAllAuthors, getAuthor, createAuthor, changeAuthor, deleteAuthor, getAuthorBooks, getAuthorsBooks, getAuthorByName } from "../controllers/authorControllers.js";

const authorRouter = express.Router();

authorRouter.get("/", getAllAuthors)

authorRouter.get("/books", getAuthorsBooks)

authorRouter.get("/:id", getAuthor)

authorRouter.post("/", createAuthor)

authorRouter.put("/:id", changeAuthor)

authorRouter.delete("/:id", deleteAuthor)

authorRouter.get("/:id/books", getAuthorBooks)

authorRouter.get("/name/:name", getAuthorByName)

export default authorRouter;

