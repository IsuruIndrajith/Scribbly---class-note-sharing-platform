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
        if (!file.originalname.endsWith('.pdf'))
            return cb(new Error('File format is incorrect'));
        cb(undefined, true)
        
    }
});


router.post("/upload", uploadFile);

export default router;
