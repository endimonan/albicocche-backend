import { Request, Response, NextFunction } from "express";
import User from "../models/User";

interface JWTPayload {
  id: string;
  email: string;
}

export const AdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req.body.user as JWTPayload)?.id;
    
    if (!userId) {
      res.status(401).json({ 
        success: false,
        message: "Usuário não autenticado" 
      });
      return;
    }

    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ 
        success: false,
        message: "Usuário não encontrado" 
      });
      return;
    }

    // Verificar se o usuário é administrador
    if (!user.isAdmin) {
      res.status(403).json({ 
        success: false,
        message: "Acesso negado: permissão de administrador necessária" 
      });
      return;
    }

    next();
  } catch (error: unknown) {
    console.error("Erro no middleware de administrador:", error);
    res.status(500).json({ 
      success: false,
      message: "Erro interno do servidor" 
    });
  }
}; 