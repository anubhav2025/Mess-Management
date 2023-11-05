import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema(
  {
    name: {
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
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

const SuperAdmin = mongoose.model("Super_Admin", superAdminSchema);
export default SuperAdmin;
