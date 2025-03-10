import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import corsOptions from "./config/corsConfig";
import authRoutes from "./routes/public/authRoutes";
import userProtectedRoutes from "./routes/protected/userProtectedRoutes";
import userRoutes from "./routes/public/userRoutes";
import recordsRoutes from "./routes/protected/recordsRoutes";
import betRoutes from "./routes/protected/betRoutes";
import { apiLimiter, loginLimiter } from "./middlewares/RateLimitMiddleware";

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", apiLimiter);

// Public Routes
app.use("/api/auth/login", loginLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Protected Routes
app.use("/api/user", userProtectedRoutes);
app.use("/api/records", recordsRoutes);
app.use("/api/bet", betRoutes);

export default app;
