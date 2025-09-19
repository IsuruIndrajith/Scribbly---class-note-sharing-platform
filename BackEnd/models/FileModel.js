import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
  userId: String // optional
});

export default mongoose.model("File", fileSchema);
// (Collection name in the cluster[usually this is stored in the mongoose as plural(as files)], second parameter is the schema)
// methana File eka MongoDB eke fileSchema ekata adala model ekak widiyata define karanawa.