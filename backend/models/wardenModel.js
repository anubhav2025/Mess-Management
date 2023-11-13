import mongoose from "mongoose";
import Mess from "./messModel.js";
import College from "./collegeModel.js";

const wardenSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "College",
    },
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    role: {
      type: String,
      default: "warden",
      immutable: true,
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
    pendingRequests: {
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
