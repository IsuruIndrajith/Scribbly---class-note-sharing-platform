import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import FileModel from "../models/FileModel.js";

export async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Extract file information
    const { path, originalname, size } = req.file;
    
    // Extract metadata from request body
    const { title, subject, semester, description, tags } = req.body;
    
    // Validate required metadata
    if (!title || !subject || !semester) {
      return res.status(400).json({ 
        message: "Missing required fields: title, subject, and semester are required" 
      });
    }
    
    // Get user information from JWT token (added by auth middleware)
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User authentication required" });
    }

    // Determine file type
    const fileType = originalname.toLowerCase().endsWith('.pdf') ? 'PDF' : 'Image';
    
    // Process tags (convert comma-separated string to array)
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      resource_type: "raw", // required for PDFs
      public_id: `${Date.now()}_${originalname}` // Add timestamp to avoid conflicts
    });

    // Save complete metadata to MongoDB
    const saved = await FileModel.create({
      // Basic file information
      filename: result.public_id,
      originalName: originalname,
      url: result.secure_url,
      size: size,
      fileType: fileType,
      
      // Note metadata
      title: title,
      subject: subject,
      semester: semester,
      description: description || '',
      tags: tagsArray,
      
      // Uploader information
      uploaderId: user.email, // Using email as unique identifier
      uploaderName: `${user.firstName} ${user.lastName}`,
      uploaderEmail: user.email
    });

    // Cleanup temp file
    fs.unlinkSync(path);

    res.status(200).json({
      message: "File uploaded successfully",
      file: saved
    });
  } catch (error) {
    console.error("Upload error:", error);
    
    // Cleanup temp file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }
    }
    
    res.status(500).json({ error: error.message });
  }
}
