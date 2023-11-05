import mongoose from "mongoose";

const storekeeperSchema = new mongoose.Schema(
  {
    mess_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    warden_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Warden",
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
    pending_requests_from_down: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Request",
    },
    // will both the request come from same request model
    requests_for_approval: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Request",
    },
  },
  {
    timestamps: true,
  }
);

const Storekeeper = mongoose.model("Storekeeper", storekeeperSchema);
export default Storekeeper;
