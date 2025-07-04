import express from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import FileModel from "../models/FileModel.js";

const router = express.Router();

// Store file temporarily in local /tmp folder
const upload = multer({
    dest: "tmp/",
    limits: {
        fileSize: 100000000 //100MB
    },

    fileFilter: (req, file, cb) => {
        if (!file.originalname.endsWith('.pdf'))
            return cb(new Error('File format is incorrect'));
        cb(undefined, true)
        
    }
});

router.post("/upload", upload.single("upload"), async (req, res) => {
  try {
    const { path, originalname, size } = req.file;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      resource_type: "raw", // required for PDFs
      public_id: originalname
    });

    // Save metadata to MongoDB
    const saved = await FileModel.create({
      filename: originalname,
      url: result.secure_url,
      size: size
    });

    // Cleanup temp file
    fs.unlinkSync(path);

    res.status(200).json({
      message: "PDF uploaded successfully",
      file: saved
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
