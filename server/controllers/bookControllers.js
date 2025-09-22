import { Author, Book } from "../models/index.js";
export async function getAllBooks(req, res) {
  const books = await Book.findAll({
    attributes: ['book_id', 'name', 'avg_rating', 'created_at', 'page_count']
  });
  res.json(books)
}

export async function getBook(req, res) {
  const id = parseInt(req.params.id);
  const book = await Book.findByPk(id, {
    attributes: ['book_id', 'author_id', 'name', 'avg_rating', 'created_at', 'page_count']
  });
  res.json(book)
}

export async function createBook(req, res) {
  const book = await Book.create(req.body);
  res.status(201).json(book);
}

export async function deleteBook(req, res) {
  const id = parseInt(req.params.id);
  const book = await Book.findByPk(id);
  await book.destroy();
  res.status(204).end();
}

export async function changeBook(req, res) {
  const id = parseInt(req.params.id);
  const book = await Book.findByPk(id);
  const newBook = await book.update(req.body)
  res.json(newBook)
}
