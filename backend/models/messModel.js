import mongoose from "mongoose";

const messSchema = new mongoose.Schema(
  {
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "College",
    },
    name: {
      type: String,
      required: true,
    },
    //warden changed to warden_id
    warden_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Warden",
    },
    storekeeper_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Storekeeper",
    },
    accountant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Accountant",
    },
    student_manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    hostel_name: {
      type: String,
      required: true,
    },
    menu_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Menu",
    },
  },
  {
    timestamps: true,
  }
);

const Mess = mongoose.model("Mess", messSchema);
export default Mess;
