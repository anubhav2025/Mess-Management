import mongoose from "mongoose";

const accountantSchema = new mongoose.Schema(
  {
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    wardenId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Warden",
    },
    role: {
      type: String,
      default: "accountant",
      immutable: true,
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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pendingRequestsFromDown: [
      {
        type: mongoose.Schema.Types.ObjectId,
        //   required: true,
        ref: "Request",
      },
    ],
    // will both the request come from same request model
    requestsForApproval: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Request",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Accountant = mongoose.model("Accountant", accountantSchema);
export default Accountant;
