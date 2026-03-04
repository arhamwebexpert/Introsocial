// models/Group.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Group name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    coverImage: {
      type: String, // URL or local path
      default: "",
    },
    inviteCode: {
      type: String,
      unique: true,
      // Auto-generate a short unique invite code on creation
      default: () => uuidv4().slice(0, 8).toUpperCase(),
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
