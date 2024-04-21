import mongoose from "mongoose";

const SavedServiceSchema = new mongoose.Schema({
  name: String,
  endpoint: String,
  apiKey: {
    key: String,
    value: String,
  },
  widget: { type: mongoose.Types.ObjectId, ref: 'Widget' },
}, {
  timestamps: true
});

export default mongoose.models.Service || mongoose.model("SavedService", SavedServiceSchema);
