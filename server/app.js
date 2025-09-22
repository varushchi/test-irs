import express from "express";
import bookRouter from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());

// app.use("/authors", authorRoutes);
app.use("/books", bookRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
