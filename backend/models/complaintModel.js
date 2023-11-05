import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "College",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    // item assosiated?
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Food_Item",
    },
    images: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending Review", "In Progress", "Resolved", "Declined"],
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Comment",
    },
    // upvote and downvote
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
