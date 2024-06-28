import { Request, Response, NextFunction } from "express";
import { JWTUtil } from "../utils/JWTUtil";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies["token"];
  if (!token) {
    res.status(401).json({ message: "Access denied, token missing!" });
    return;
  }

  try {
    const decoded = JWTUtil.verifyToken(token);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
