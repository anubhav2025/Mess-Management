const mongoose = require("mongoose");
const Manager = require("./managerModel");
const Storekeeper = require("./storekeeperModel");
const Warden = require("./wardenModel");
const Complaint = require("./complaintModel");

const requestSchema = new mongoose.Schema({
  madeBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "madeByType",
  },
  madeByType: {
    type: String,
    required: true,
    enum: ["Manager", "Storekeeper", "Warden"],
  },
  complaintAssociated: Boolean,
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complaint", // Replace 'Complaint' with the actual model name for complaints
  },
  approvedByWarden: Boolean,
  approvedByStorekeeper: Boolean,
  approvedByAccountant: Boolean,
  title: {
    type: String,
    required: true,
  },
  description: String,
  wardenRemarks: String,
  storekeeperRemarks: String,
  managerRemarks: String,
  lastApprovedByType: {
    type: String,
    required: true,
    enum: ["Manager", "Storekeeper", "Warden"],
  },
  lastApprovedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "lastApprovedByType",
  },
  approvalNeededFrom: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "approvalNeededFromType",
    },
  ],
  approvalNeededFromType: [
    {
      type: String,
      required: true,
      enum: ["Manager", "Storekeeper", "Warden"],
    },
  ],
  accountantRemarks: String,
  associatedRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
