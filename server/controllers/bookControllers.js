import { Author, Book } from "../models/index.js";
export async function getAllBooks(req, res) {
  try {
    const books = await Book.findAll({
      include: Author
    });
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}

export async function getBook(req, res) {
  const id = parseInt(req.params.id);
  if (Number, isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  try {
    const book = await Book.findByPk(id, {
      attributes: ['book_id', 'author_id', 'name', 'avg_rating', 'created_at', 'page_count']
    });
    res.json(book)
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}

export async function createBook(req, res) {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}

export async function deleteBook(req, res) {
  const id = parseInt(req.params.id);
  if (Number, isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  try {
    const book = await Book.findByPk(id);
    await book.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}

export async function changeBook(req, res) {
  const id = parseInt(req.params.id);
  if (Number, isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  try {
    const book = await Book.findByPk(id);
    const newBook = await book.update(req.body)
    res.json(newBook)
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}
