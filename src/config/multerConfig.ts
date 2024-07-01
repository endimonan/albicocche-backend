import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (![".png", ".jpg", ".jpeg", ".gif"].includes(ext)) {
      return cb(new Error("Apenas imagens são permitidas") as any, false);
    }
    cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 1.5 },
});

export default upload;
