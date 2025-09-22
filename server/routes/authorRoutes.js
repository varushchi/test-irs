import express from "express";

const authorRouter = express.Router();

authorRouter.get("/", () => {
  // TODO: return all authors
});

authorRouter.get("/:id", () => {
  // TODO: return a single author by its author_id
});

authorRouter.post("/", () => {
  // TODO: add a new author to the database
});

authorRouter.put("/:id", () => {
  // TODO: update author details by author_id
});

authorRouter.delete("/:id", () => {
  // TODO: remove a author from the database by author_id
});

authorRouter.get("/:id/books", () => {
  // TODO: return all books for the author with the given name
});

export default authorRouter;

