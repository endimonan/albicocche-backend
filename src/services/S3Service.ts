import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../config/awsConfig";

export class S3Service {
  public async uploadFile(
    key: string,
    buffer: Buffer,
    contentType: string
  ): Promise<void> {
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    };

    await s3.send(new PutObjectCommand(uploadParams));
  }

  public async deleteFile(key: string): Promise<void> {
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));
  }

  public async getFileUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    });

    return await getSignedUrl(s3, command, { expiresIn: 3600 });
  }
}
