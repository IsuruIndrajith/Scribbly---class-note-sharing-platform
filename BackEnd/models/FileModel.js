import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
  userId: String // optional
});

export default mongoose.model("File", fileSchema);
