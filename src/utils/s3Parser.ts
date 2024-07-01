export class S3UrlParser {
  public static extractKeyFromUrl(url: string): string | null {
    const parts = url.split(
      `${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`
    );
    return parts[1] || null;
  }

  public static generateS3Url(key: string): string {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
