import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import corsOptions from "./config/corsConfig";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

export default app;
