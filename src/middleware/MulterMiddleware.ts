import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";
import { ResponseError } from "../error/responseError";

// Create uploads directory if it doesn't exist
const createUploadsDir = async () => {
  try {
    await fs.access("uploads");
  } catch {
    await fs.mkdir("uploads");
  }
};

createUploadsDir();

// Configure storage
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

// Configure file filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Check file type
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(
      new ResponseError(
        400,
        "Only image files (jpg, jpeg, png, gif) are allowed!"
      )
    );
  }

  // Check mimetype
  const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new ResponseError(400, "Invalid file type"));
  }
  cb(null, true);
};

// Create upload middleware
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Helper function to clean up uploaded file
export const cleanupFile = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Error cleaning up file ${filePath}:`, error);
  }
};

// Export specific upload middlewares for different use cases
export const uploadPostImage = upload.single("image");
export const uploadAvatar = upload.single("avatar");
