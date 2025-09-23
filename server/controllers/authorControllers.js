import { Author, sequelize } from "../models/index.js";
import { QueryTypes } from "sequelize";

export async function getAllAuthors(req, res) {
  try {
    const authors = await Author.findAll({
      attributes: ['author_id', 'name', 'royalties', 'birth_date', 'awards_count']
    });
    res.json(authors)
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}

export async function getAuthor(req, res) {
  const id = parseInt(req.params.id);
  if (Number, isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  try {
    const authors = await Author.findByPk(id, {
      attributes: ['author_id', 'name', 'royalties', 'birth_date', 'awards_count']
    });
    res.json(authors)
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}

export async function createAuthor(req, res) {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}

export async function deleteAuthor(req, res) {
  const id = parseInt(req.params.id);
  if (Number, isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  try {
    const book = await Author.findByPk(id);
    await book.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}

export async function changeAuthor(req, res) {
  const id = parseInt(req.params.id);
  if (Number, isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  try {
    const author = await Author.findByPk(id);
    const newAuthor = await author.update(req.body)
    res.json(newAuthor)
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}

export async function getAuthorBooks(req, res) {
  const id = parseInt(req.params.id);
  if (Number, isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
  }
  try {
    const books = await sequelize.query(
      `select authors.author_id, books.book_id, books.name, books.avg_rating, books.created_at, books.page_count
      from authors
              right outer join books on authors.author_id = books.author_id
      where authors.author_id = :author_id`,
      {
        replacements: { author_id: id },
        type: QueryTypes.SELECT
      }
    )
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` })
  }
}
