import User, { IUser } from "../models/User";
import { PasswordUtil } from "../utils/PasswordUtil";
import { EmailUtil } from "../utils/EmailUtil";
import { generateVerificationCode } from "../utils/CodeUtil";

export class UserService {
  async register(email: string, password: string): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await PasswordUtil.hashPassword(password);
    const verificationCode = generateVerificationCode();

    const user = new User({
      email,
      password: hashedPassword,
      verificationCode,
    });

    await user.save();
    await EmailUtil.sendVerificationEmail(email, verificationCode);
    return user;
  }

  async verifyEmail(email: string, code: string): Promise<void> {
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== code) {
      throw new Error("Invalid verification code");
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
  }
}
