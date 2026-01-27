import { Lyric } from "@/types/lyric";
import mongoose from "mongoose";

const LyricSchema = new mongoose.Schema<Lyric>(
  {
    user: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Lyric || mongoose.model("Lyric", LyricSchema);
