import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: String,
  endpoint: String,
  apiKey: {
    key: String,
    value: String,
  },
  widgets: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'Widget' }],
    default: [],
  }
}, {
  timestamps: true
});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
