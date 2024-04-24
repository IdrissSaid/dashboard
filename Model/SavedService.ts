import mongoose from "mongoose";

const SavedServiceSchema = new mongoose.Schema({
  data: [{key: String, value: String}]
}, {
  timestamps: true
});

export default mongoose.models.SavedService || mongoose.model("SavedService", SavedServiceSchema);
