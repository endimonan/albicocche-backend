import { format } from "date-fns";
import { Types } from "mongoose";
import User from "../models/User";
import { S3Service } from "./S3Service";
import { S3UrlParser } from "../utils/s3Parser";
import { FileValidation } from "../validations/fileValidation";

export class UploadService {
  private s3Service: S3Service;

  constructor() {
    this.s3Service = new S3Service();
  }

  public async uploadFile(
    userId: Types.ObjectId,
    file: Express.MulterS3.File
  ): Promise<string> {
    FileValidation.validateImage(file);

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.avatarUrl) {
      const oldKey = S3UrlParser.extractKeyFromUrl(user.avatarUrl);
      if (oldKey) {
        await this.s3Service.deleteFile(oldKey);
      }
    }

    const timestamp = format(new Date(), "yyyy-MM-dd_HH-mm");
    const ext = file.originalname.split(".").pop();
    const key = `avatar/${userId}-${timestamp}.${ext}`;

    await this.s3Service.uploadFile(key, file.buffer, file.mimetype);

    const fileUrl = S3UrlParser.generateS3Url(key);

    await User.findByIdAndUpdate(userId, { avatarUrl: fileUrl });

    return fileUrl;
  }

  public async getFileUrl(key: string): Promise<string> {
    return this.s3Service.getFileUrl(key);
  }
}
