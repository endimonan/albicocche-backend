import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsConfig";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";


const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;
