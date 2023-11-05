import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    adminFname: {
      type: String,
      required: true,
    },
    adminLname: {
      type: String,
      required: true,
    },
    designation: {
      // what is this?
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
    messes: {
      type: [String],
      // required or not?
    },
  },
  {
    timestamps: true,
  }
);

const College = mongoose.model("College", collegeSchema);
export default College;
