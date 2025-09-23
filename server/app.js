import express from "express";
import bookRouter from "./routes/bookRoutes.js";
import authorRouter from "./routes/authorRoutes.js";

const app = express();
app.use(express.json());

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
