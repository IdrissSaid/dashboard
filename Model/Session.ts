import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  user: {
    email: { type: String, unique: true, required: true},
    password: String,
    picture: String
  },
  account: {
    provider: String,
    access_token: String,
    expires_at: String,
    refresh_token: String,
    id_token: String,
  },
  session: {
    sessionId: { type: String, unique: true, required: true }
  },
}, {
  timestamps: true
});

export default mongoose.models.Session || mongoose.model("Session", SessionSchema);
