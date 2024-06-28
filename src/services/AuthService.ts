import User from "../models/User";
import { PasswordUtil } from "../utils/security/PasswordUtil";
import { JWTUtil } from "../utils/security/JWTUtil";
import { Response } from "express";

export class AuthService {
  async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (
      !user ||
      !(await PasswordUtil.comparePassword(password, user.password))
    ) {
      throw new Error("Invalid credentials");
    }

    if (!user.isVerified) {
      throw new Error("Email not verified");
    }

    return JWTUtil.generateToken({ userId: user._id });
  }

  logout(response: Response): void {
    response.clearCookie("token");
  }
}
