import express from "express";
import cors from "cors";
import bookRouter from "./routes/bookRoutes.js";
import authorRouter from "./routes/authorRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(8000, () => console.log("Server running on port 8000"));
