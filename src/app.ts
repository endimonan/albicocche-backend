import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsConfig";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import recordsRoutes from "./routes/recordsRoutes";
import betRoutes from "./routes/betRoutes";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/records", recordsRoutes);
app.use("/api/bet", betRoutes);

export default app;
