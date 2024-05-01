import mongoose from "mongoose";

const WidgetParamSchema = new mongoose.Schema({
  name: String,
  desc: String,
  type: String
});

const WidgetSchema = new mongoose.Schema({
  name: String,
  description: String,
  path: String,
  method: String,
  returnType: String,
  params: [WidgetParamSchema]
}, {
  timestamps: true
});

export default mongoose.models.Widget || mongoose.model("Widget", WidgetSchema);
