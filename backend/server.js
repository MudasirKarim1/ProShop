import express from "express";
import productsRouter from "./routes/productRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
const app = express();
const port = process.env.PORT || 5000;
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

connectDB();

app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
