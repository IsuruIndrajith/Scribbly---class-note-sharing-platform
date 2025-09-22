import express from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import FileModel from "../models/FileModel.js";
import { uploadFile } from "../controllers/NoteUploadController.js";

const router = express.Router();

// Store file temporarily in local /tmp folder
const upload = multer({
    dest: "tmp/",
    limits: {
        fileSize: 100000000 //100MB
    },

  fileFilter: (req, file, cb) => {
        const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
        if (!allowed.includes(file.mimetype)) {
            return cb(new Error('File format is incorrect'));
        }
        cb(undefined, true)
    }
});


router.post("/upload", upload.single("file"), uploadFile);

export default router;
