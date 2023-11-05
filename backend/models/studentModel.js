import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema(
  {
    mess_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    regno: {
      type: String,
      required: true,
    },
    roomno: {
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
    complaints_last_30_days: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Complaint",
      },
    ],
    // calories_taken
    block_status: {
      type: bool,
      default: false,
    },
    blocked_till: {
      type: Date,
    },
    id_expires_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const SuperAdmin = mongoose.model("Super_Admin", superAdminSchema);
export default SuperAdmin;
