import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema(
  {
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "College",
    },
    image: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pending_requests: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Request",
    },
  },
  {
    timestamps: true,
  }
);

const Warden = mongoose.model("Warden", wardenSchema);
export default Warden;
