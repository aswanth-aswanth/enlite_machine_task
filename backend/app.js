import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", userRoutes);

app.use(errorMiddleware);

export default app;
