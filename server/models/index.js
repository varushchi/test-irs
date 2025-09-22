import { DataTypes } from "sequelize";
import { connectDB } from "../utils/connect-db.js";
import { AuthorModel } from "./authors.js";
import { BookModel } from "./books.js";

const sequelize = connectDB();

const Author = AuthorModel(sequelize, DataTypes);
const Book = BookModel(sequelize, DataTypes);

Author.hasMany(Book, { foreignKey: "author_id" });
Book.belongsTo(Author, { foreignKey: "author_id" });

export {
  sequelize,
  Author,
  Book,
};

