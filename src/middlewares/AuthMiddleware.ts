import { Request, Response, NextFunction } from "express";
import { JWTUtil } from "../utils/security/JWTUtil";

interface TokenError extends Error {
  name: string;
}

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token =
      req.cookies["token"] ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Acesso negado: token não fornecido",
      });
      return;
    }

    try {
      const decoded = JWTUtil.verifyToken(token);
      req.body.user = decoded;
      next();
    } catch (error: unknown) {
      const tokenError = error as TokenError;
      if (tokenError.name === "TokenExpiredError") {
        res.status(401).json({
          success: false,
          message: "Token expirado. Faça login novamente",
        });
      } else if (tokenError.name === "JsonWebTokenError") {
        res.status(401).json({
          success: false,
          message: "Token inválido",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Falha na autenticação",
        });
      }
    }
  } catch (error: unknown) {
    console.error("Erro no middleware de autenticação:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
};
