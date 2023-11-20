const mongoose = require("mongoose");

const remarkSchema = new mongoose.Schema({
	madeById: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	remark: {
		type: String,
		required: true,
	},
	timestamps: {
		type: Date,
		default: Date.now,
	},
});

const requestSchema = new mongoose.Schema({
	madeById: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	messId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Mess",
	},
	collegeAdminId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "CollegeAdmin",
	},
	status: {
		type: String,
		required: true,
		enum: ["active", "approved", "declined"],
	},
	complaintAssociated: Boolean,
	complaintId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Complaint",
	},
	title: {
		type: String,
		required: true,
	},
	description: String,
	remarks: [remarkSchema],
	approvedBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	declinedBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	approvalNeededFrom: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	associatedRequests: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Request",
		},
	],
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
