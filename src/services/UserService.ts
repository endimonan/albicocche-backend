import User from "../models/User";
import { PasswordUtil } from "../utils/PasswordUtil";
import { EmailUtil } from "../utils/EmailUtil";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  async register(email: string, password: string): Promise<User> {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await PasswordUtil.hashPassword(password);
    const verificationCode = uuidv4();

    const user = await User.create({
      email,
      password: hashedPassword,
      verificationCode,
    });

    await EmailUtil.sendVerificationEmail(email, verificationCode);
    return user;
  }

  async verifyEmail(email: string, code: string): Promise<void> {
    const user = await User.findOne({ where: { email } });
    if (!user || user.verificationCode !== code) {
      throw new Error("Invalid verification code");
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
  }
}
