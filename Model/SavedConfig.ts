import mongoose from "mongoose";

const SavedConfigSchema = new mongoose.Schema({
  config: [String],
  savedService: { type: mongoose.Types.ObjectId, ref: 'SavedService' },
}, {
  timestamps: true
});

export default mongoose.models.SavedConfig || mongoose.model("SavedConfig", SavedConfigSchema);
