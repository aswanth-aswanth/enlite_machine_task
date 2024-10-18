import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./config/db";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", userRoutes);

app.use(errorMiddleware);

export default app;
