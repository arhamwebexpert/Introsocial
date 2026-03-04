// models/Moment.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const MomentSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
    },
    caption: {
      type: String,
      default: "",
      trim: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Reactions: array of userIds who liked
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Basic comments
    comments: [CommentSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Moment || mongoose.model("Moment", MomentSchema);
