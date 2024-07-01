import { Request, Response } from "express";
import { UploadService } from "../services/UploadService";

const uploadService = new UploadService();

export class UploadController {
  public static async uploadFile(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const file = req.file as Express.MulterS3.File;
      const userId = req.body.user.userId;
      const fileUrl = await uploadService.uploadFile(userId, file);
      return res.status(201).json({ fileUrl });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
