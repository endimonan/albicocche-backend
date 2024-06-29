import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  }

  static logout(req: Request, res: Response): void {
    authService.logout(res);
    res.status(200).json({ message: "Logout successful" });
  }
}
