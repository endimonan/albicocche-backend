import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  verificationCode: string | null;
  newEmail: string | null;
  emailVerificationCode: string | null;
}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String, default: null },
  newEmail: { type: String, default: null },
  emailVerificationCode: { type: String, default: null },
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
