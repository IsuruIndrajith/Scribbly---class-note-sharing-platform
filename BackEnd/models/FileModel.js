import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  // Basic file information
  filename: { type: String, required: true },
  originalName: { type: String }, // Original filename before processing
  url: { type: String, required: true },
  size: { type: Number, required: true },
  fileType: { type: String, required: true }, // PDF, Image, etc.
  
  // Note metadata from frontend form
  title: { type: String, required: true },
  subject: { type: String, required: true },
  semester: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }], // Array of tags
  
  // Uploader information
  uploaderId: { type: String, required: true },
  uploaderName: { type: String, required: true },
  uploaderEmail: { type: String },
  
  // Statistics
  downloads: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  
  // Timestamps
  uploadedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
fileSchema.pre('save', function() {
  this.updatedAt = new Date();
});

export default mongoose.model("File", fileSchema);
