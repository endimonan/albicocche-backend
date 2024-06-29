import User, { UserDocument } from "../models/User";
import { PasswordUtil } from "../utils/security/PasswordUtil";
import { EmailUtil } from "../utils/EmailUtil";
import { generateVerificationCode } from "../utils/CodeUtil";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";

export class UserService {
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<UserDocument> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await PasswordUtil.hashPassword(password);
    const verificationCode = generateVerificationCode();

    const user = new User({
      name,
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

    if (user.isVerified) {
      throw new Error("User already verified");
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
  }

  async sendEmailVerificationCode(
    userId: string,
    newEmail: string
  ): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const verificationCode = generateVerificationCode();
    user.emailVerificationCode = verificationCode;
    user.newEmail = newEmail;

    await user.save();
    await EmailUtil.sendVerificationEmail(newEmail, verificationCode);
  }

  async confirmAndUpdateEmail(
    userId: string,
    newEmail: string,
    verificationCode: string
  ): Promise<UserDocument | null> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (
      user.emailVerificationCode !== verificationCode ||
      user.newEmail !== newEmail
    ) {
      throw new Error("Invalid verification code or email");
    }

    user.email = newEmail;
    user.newEmail = null;
    user.emailVerificationCode = null;

    return await user.save();
  }

  async updateUser(
    userId: string,
    updates: UpdateUserDTO
  ): Promise<UserDocument | null> {
    if (updates.password) {
      updates.password = await PasswordUtil.hashPassword(updates.password);
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    return user;
  }
}
