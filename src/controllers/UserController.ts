import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import User, { UserDocument } from "../models/User";

const userService = new UserService();

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, surname, email, password } = req.body;
      const user = await userService.register(name, surname, email, password);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email, code } = req.body;
      await userService.verifyEmail(email, code);
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async updateEmailRequest(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.user.userId;
      const { newEmail } = req.body;
      await userService.sendEmailVerificationCode(userId, newEmail);
      res.status(200).json({ message: "Verification code sent to new email" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async updateEmailConfirm(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.user.userId;
      const { newEmail, verificationCode } = req.body;
      const user = await userService.confirmAndUpdateEmail(
        userId,
        newEmail,
        verificationCode
      );
      res.status(200).json({ message: "Email updated successfully", user });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.user.userId;
      const updates: UpdateUserDTO = req.body;
      const user = await userService.updateUser(userId, updates);
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async profile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.user.userId;
      const user = await User.findById(userId).select(
        "-password -newEmail -verificationCode -emailVerificationCode"
      );

      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
