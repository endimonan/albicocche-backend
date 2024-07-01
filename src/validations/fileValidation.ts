export class FileValidation {
  public static validateImage(file: Express.MulterS3.File): void {
    if (!file.mimetype.startsWith("image/")) {
      throw new Error("Invalid file type. Only images are allowed.");
    }
  }
}
