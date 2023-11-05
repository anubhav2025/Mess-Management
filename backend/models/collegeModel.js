import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    college_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    admin_fname: {
      type: String,
      required: true,
    },
    admin_lname: {
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
