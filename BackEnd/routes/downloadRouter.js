import express from "express";
import FileModel from "../models/FileModel.js";

const router = express.Router();

// GET /download/:id
router.get("/download/:id", async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);

    if (!file) return res.status(404).json({ message: "File not found" });

    // Set headers to force download
    res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    // Redirect to Cloudinary URL (client will download it)
    res.redirect(file.url);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /download-by-name/:filename
router.get("/download-by-name/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;

    const file = await FileModel.findOne({ filename });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Set headers to force download
    res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    // Redirect to Cloudinary raw URL
    res.redirect(file.url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});





export default router;
