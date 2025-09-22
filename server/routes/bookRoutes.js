import express from "express";
import { changeBook, createBook, deleteBook, getAllBooks, getBook } from "../controllers/bookControllers.js";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBook);

bookRouter.post("/", createBook);

bookRouter.put("/:id", changeBook);

bookRouter.delete("/:id", deleteBook);

export default bookRouter;

