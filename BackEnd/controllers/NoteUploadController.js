import FileModel from "../models/FileModel.js";

export async function uploadFile(req, res) {
    upload.single("upload"), async (req, res) => {
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
    }
}