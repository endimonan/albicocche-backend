import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationCode: string | null;
  newEmail: string | null;
  emailVerificationCode: string | null;
  records: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String, default: null },
  newEmail: { type: String, default: null },
  emailVerificationCode: { type: String, default: null },
  records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
