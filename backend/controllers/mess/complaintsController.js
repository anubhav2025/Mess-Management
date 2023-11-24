import asyncHandler from "../../middleware/asyncHandler.js";
import { roleHierarchy } from "../../constants.js";
import User from "../../models/users/userModel.js";
import Request from "../../models/requestModel.js";
import Complaint from "../../models/complaintModel.js";

// @desc    Upvote a complaint
// @route   PUT /api/mess/complaints/:id/upvote
// @access  {Specify access control as needed}
const upvoteComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const userId = req.user._id;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint || req.user.role !== "Student") {
      return res.status(404).json({
        success: false,
        error: "Complaint not found or not authorized.",
      });
    }

    // Check if the user has already upvoted
    const alreadyUpvoted = complaint.upvotes.includes(userId);

    if (alreadyUpvoted) {
      // User has already upvoted, remove the upvote
      complaint.upvotes = complaint.upvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // User has not upvoted, add the upvote
      complaint.upvotes.push(userId);

      // If user has downvoted, remove the downvote
      complaint.downvotes = complaint.downvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
    }

    // Save the updated complaint
    await complaint.save();

    res
      .status(200)
      .json({ success: true, data: "Complaint upvoted successfully" });
  } catch (error) {
    console.error("Error upvoting complaint:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Downvote a complaint
// @route   PUT /api/mess/complaints/:id/downvote
// @access  {Specify access control as needed}
const downvoteComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const userId = req.user._id;

    // Find the complaint by ID
    const complaint = await Complaint.findById(complaintId);

    if (!complaint || req.user.role !== "Student") {
      return res
        .status(404)
        .json({ success: false, error: "Complaint not found" });
    }

    // Check if the user has already downvoted
    const alreadyDownvoted = complaint.downvotes.includes(userId);

    if (alreadyDownvoted) {
      // User has already downvoted, remove the downvote
      complaint.downvotes = complaint.downvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // User has not downvoted, add the downvote
      complaint.downvotes.push(userId);

      // If user has upvoted, remove the upvote
      complaint.upvotes = complaint.upvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
    }

    // Save the updated complaint
    await complaint.save();

    res
      .status(200)
      .json({ success: true, data: "Complaint downvoted successfully" });
  } catch (error) {
    console.error("Error downvoting complaint:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get number of upvotes and downvotes on a complaint
// @route   GET /api/mess/complaints/:id/votes
// @access  {Specify access control as needed}
const getComplaintVotes = async (req, res) => {
  try {
    const complaintId = req.params.id;

    // Find the complaint by ID
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res
        .status(404)
        .json({ success: false, error: "Complaint not found" });
    }

    const upvotesCount = complaint.upvotes.length;
    const downvotesCount = complaint.downvotes.length;

    res.status(200).json({
      success: true,
      data: { upvotes: upvotesCount, downvotes: downvotesCount },
    });
  } catch (error) {
    console.error("Error retrieving complaint votes:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Create a new complaint
// @route   POST /api/mess/complaints/create
// @access  {Specify access control as needed}
const createComplaint = async (req, res) => {
  try {
    const { itemId, title, description, images } = req.body;
    const userId = req.user._id;
    const imagesTemp = images ? images : [];

    // Set itemAssociated based on the presence of itemId
    const itemAssociated = !!itemId;

    // Create the complaint
    const newComplaint = new Complaint({
      collegeAdminId: req.user.collegeAdminId,
      madeById: userId,
      messId: req.user.messId,
      itemAssociated,
      itemId: itemAssociated ? itemId : undefined,
      title,
      description,
      images: imagesTemp,
      status: "Pending Review",
      comments: [], // You might handle comments logic here if needed
      upvotes: [],
      downvotes: [],
    });

    // Save the complaint to the database
    await newComplaint.save();

    res.status(201).json({ success: true, data: newComplaint });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get filtered complaints for a specific mess
// @route   GET /api/mess/complaints/filter
// @access  {Specify access control as needed}
// DATE in YYYY-MM-DD
const getFilteredComplaints = async (req, res) => {
  try {
    const { id, dateType, status, date, title, sortBy, sortOrder } = req.query;

    if (id) {
      const complaint = await Complaint.findById(id);
      if (!complaint) {
        return res
          .status(404)
          .json({ success: false, error: "Complaint not found" });
      }
      return res.status(200).json({ success: true, data: complaint });
    }

    let query = { messId: req.user?.messId };

    if (status) {
      query.status = status;
    }

    if (title) {
      query.$or = [
        { title: { $regex: new RegExp(title, "i") } },
        { description: { $regex: new RegExp(title, "i") } },
      ];
    }

    if (date) {
      let startDate, endDate;

      if (dateType === "present_day") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        startDate = today;
        endDate = new Date(); // Current
      } else if (dateType === "specific_day") {
        const specificDate = new Date(date);
        specificDate.setHours(0, 0, 0, 0);
        startDate = specificDate;
        endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
      } else if (dateType === "month") {
        const [year, month] = date.split("-");
        startDate = new Date(year, month - 1, 1);
        endDate = new Date(year, month, 0, 23, 59, 59, 999);
      } else if (dateType === "year") {
        const [year] = date.split("-");
        startDate = new Date(year, 0, 1);
        endDate = new Date(year, 12, 0, 23, 59, 59, 999);
      }

      query.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    let sortCriteria = {};
    if (sortBy === "upvotes") {
      sortCriteria = { upvotes: sortOrder === "desc" ? -1 : 1 };
    } else if (sortBy === "createdAt") {
      sortCriteria = { createdAt: sortOrder === "desc" ? -1 : 1 };
    }

    const filteredComplaints = await Complaint.find(query).sort(sortCriteria);

    res.status(200).json({ success: true, data: filteredComplaints });
  } catch (error) {
    console.error("Error retrieving filtered complaints:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    update a specific complaint status.
// @route   GET /api/mess/complaints/updateStatus
// @access  {Specify access control as needed}
const updateComplaintStatus = async (req, res) => {
  try {
    const { id, newStatus } = req.body;

    if (!id || !newStatus) {
      return res
        .status(400)
        .json({ success: false, error: "Missing ID or new status" });
    }

    const validStatuses = [
      "Pending Review",
      "In Progress",
      "Resolved",
      "Declined",
    ];
    if (!validStatuses.includes(newStatus)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid status provided" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint || complaint.messId !== req.user.messId) {
      return res
        .status(404)
        .json({ success: false, error: "Complaint not found or unauthorized" });
    }

    complaint.status = newStatus;
    await complaint.save();

    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    get top voted complaints
// @route   GET /api/mess/complaints/latest
// @access  {Specify access control as needed}
const getLatestComplaints = async (req, res) => {
  try {
    // Fetch the latest 10 complaints, sorted by timestamp in descending order
    const messId = req.params.messId;
    const latestComplaints = await Complaint.find({ messId: messId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(latestComplaints);
  } catch (error) {
    console.error("Error fetching latest complaints:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getFilteredComplaints,
  upvoteComplaint,
  downvoteComplaint,
  getComplaintVotes,
  createComplaint,
  updateComplaintStatus,
  getLatestComplaints,
};
