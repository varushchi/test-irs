import { connectDB } from "./utils/connect-db.js";
import fs from "fs";

const sequelize = connectDB();

try {
  await sequelize.authenticate();
  console.log("Connected to DB");

  const sql = fs.readFileSync("../init-db.sql", "utf-8")

  const query = await sequelize.query(sql)

} catch (err) {
  console.error(err);
}
