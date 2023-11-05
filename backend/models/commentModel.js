import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    complaint_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Complaint",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    description: {
      type: String,
      required: true,
    },
    // upvote and downvote
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
