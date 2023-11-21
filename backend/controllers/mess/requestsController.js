import asyncHandler from "../../middleware/asyncHandler.js";
import { roleHierarchy } from "../../constants.js";
import User from "../../models/users/userModel.js";
import Request from "../../models/requestModel.js";
import Complaint from "../../models/complaintModel.js";

// const getPendingRequests = asyncHandler(async (req, res) => {
// 	console.log("GET PENDING REQUESTS CALLED.");
// 	res.status(200);
// });

// @desc    Create a new request
// @route   POST /api/mess/requests/create
// @access  {Specify access control as needed}
const createRequest = async (req, res) => {
  try {
    const { title, description, approvalNeededRoles, remarks } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    // Determine user IDs for approvalNeededFrom based on roles provided
    const approvalNeededFrom = [];

    // Get users with roles same or lower hierarchy than the current user
    const eligibleUsers = await User.find({
      role: { $in: approvalNeededRoles },
      messId: req.user.messId,
    });

    eligibleUsers.forEach((user) => {
      if (roleHierarchy[user.role] >= roleHierarchy[userRole]) {
        approvalNeededFrom.push(user._id);
      }
    });

    // Create a new request
    const newRequest = new Request({
      madeById: userId,
      messId: req.user.messId,
      collegeAdminId: req.user.collegeAdminId,
      status: "active",
      title,
      description,
      remarks: [{ madeById: userId, remark: remarks }], // Initial remark by the user
      approvalNeededFrom,
      complaintAssociated: false,
    });

    // Save the new request
    await newRequest.save();

    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get filtered requests
// @route   GET /api/mess/requests/filter
// @access  {Specify access control as needed}
// DATE in YYYY-MM-DD
const getFilteredRequests = async (req, res) => {
  try {
    const { dateType, status, date, title, fromField } = req.query;
    const userId = req.user._id;
    const userRole = req.user.role; //

    let query = {};

    if (userRole !== "CollegeAdmin") {
      query = {
        $or: [
          { madeById: userId }, // made by user
          { approvalNeededFrom: userId }, // user in approvalNeededFrom array
          { approvedBy: userId }, // in approvedBy array
          { declinedBy: userId }, // in declinedBy array
        ],
      };
    }

    if (status) {
      query.status = status;
    }

    if (title) {
      // from request's title, description, and associatedRequests title
      query.$or = [
        { title: { $regex: new RegExp(title, "i") } },
        { description: { $regex: new RegExp(title, "i") } },
        { "associatedRequests.title": { $regex: new RegExp(title, "i") } },
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

      query.timestamps = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    if (fromField === "down") {
      // requests where user's ID in approvalNeededFrom, approvedBy, declinedBy
      query.$or = [
        { approvalNeededFrom: userId },
        { approvedBy: userId },
        { declinedBy: userId },
      ];
    } else if (fromField === "up") {
      // requests where madeById is user's ID
      query.madeById = userId;
    }

    const filteredRequests = await Request.find(query);

    res.status(200).json({ success: true, data: filteredRequests });
  } catch (error) {
    console.error("Error retrieving filtered requests:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Approve a request
// @route   PUT /api/mess/requests/:id/approve
// @access  {Specify access control as needed}
const approveRequest = asyncHandler(async (req, res) => {
  const requestId = req.params.id;
  const userId = req.user._id; // Assuming logged-in user ID is available in req.user._id

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, error: "Request not found" });
    }

    const index = request.approvalNeededFrom.indexOf(userId);

    if (index === -1 || req.status != "active") {
      return res.status(403).json({
        success: false,
        error: "User not authorized to approve this request",
      });
    }

    request.approvalNeededFrom.splice(index, 1);
    request.approvedBy.push(userId);

    if (request.approvalNeededFrom.length === 0) {
      request.status = "approved";
    }
    await request.save();

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// @desc    Forward a request from one staff member to another within the same mess
// @route   PUT /api/mess/requests/forward
// @access  {Specify access control as needed}
const forwardRequest = async (req, res) => {
  try {
    const { requestId, role } = req.body;
    const userId = req.user._id;

    // Find the request by ID
    const request = await Request.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, error: "Request not found" });
    }

    // Check if the messId of the request and the user are the same
    if (request.messId.toString() !== req.user.messId.toString()) {
      return res.status(403).json({
        success: false,
        error: "Cannot forward request to a different mess",
      });
    }

    // Find the user with the given role and messId
    const userToForward = await User.findOne({ role, messId: req.user.messId });

    if (!userToForward) {
      return res.status(404).json({
        success: false,
        error: "User with the specified role not found in the same mess",
      });
    }

    // check if the approvalNeededFrom array include user's ID
    const index = request.approvalNeededFrom.indexOf(userId);

    if (index === -1) {
      return res.status(403).json({
        success: false,
        error: "User not authorized to forward this request",
      });
    }

    // remove user's id from approvalNeededFrom array
    request.approvalNeededFrom.splice(index, 1);

    // add new user's id found from role and messId combination
    request.approvalNeededFrom.push(userToForward._id);

    await request.save();

    res
      .status(200)
      .json({ success: true, data: "Request forwarded successfully" });
  } catch (error) {
    console.error("Error forwarding request:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Associate requests with each other
// @route   POST /api/mess/requests/associate
// @access  {Specify access control as needed}
const associateRequests = async (req, res) => {
  try {
    const { mainRequestId, associatedRequestIds } = req.body;
    const userId = req.user._id;

    // Find the main request by ID
    const mainRequest = await Request.findById(mainRequestId);

    if (!mainRequest) {
      return res
        .status(404)
        .json({ success: false, error: "Main request not found" });
    }

    // Check if the logged-in user is authorized to associate requests
    if (mainRequest.madeById.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        error: "User not authorized to associate requests",
      });
    }

    // Add associatedRequestIds to the associatedRequests array of the main request
    mainRequest.associatedRequests = [
      ...mainRequest.associatedRequests,
      ...associatedRequestIds,
    ];

    // Save the main request with updated associatedRequests
    await mainRequest.save();

    // Iterate through associatedRequestIds and update their associatedRequests arrays
    for (const associatedRequestId of associatedRequestIds) {
      const associatedRequest = await Request.findById(associatedRequestId);

      if (associatedRequest) {
        // Add the main request to the associatedRequests array of the associated request
        associatedRequest.associatedRequests.push(mainRequestId);

        // Save the associated request with the updated associatedRequests array
        await associatedRequest.save();
      }
    }

    res
      .status(200)
      .json({ success: true, data: "Requests associated successfully" });
  } catch (error) {
    console.error("Error associating requests:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Delete a request based on specified conditions
// @route   DELETE /api/mess/requests/:id
// @access  {Specify access control as needed}
const deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;

    // Find the request by ID
    const requestToDelete = await Request.findById(requestId);

    if (!requestToDelete) {
      return res
        .status(404)
        .json({ success: false, error: "Request not found" });
    }

    if (
      requestToDelete.madeById.toString() !== userId.toString() &&
      !(
        requestToDelete.status === "approved" ||
        requestToDelete.status === "declined"
      ) &&
      userRole !== "CollegeAdmin"
    ) {
      return res.status(403).json({
        success: false,
        error: "User not authorized to delete this request",
      });
    }

    // Find requests where the requestToDelete is in their associatedRequests array
    const relatedRequests = await Request.find({
      associatedRequests: requestId,
    });

    // Remove the requestToDelete ID from the associatedRequests arrays of related requests
    for (const relatedRequest of relatedRequests) {
      relatedRequest.associatedRequests =
        relatedRequest.associatedRequests.filter(
          (associatedRequestId) =>
            associatedRequestId.toString() !== requestId.toString()
        );
      await relatedRequest.save();
    }

    // Delete the request
    await requestToDelete.remove();

    res
      .status(200)
      .json({ success: true, data: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Decline a request based on specified conditions
// @route   PUT /api/mess/requests/:id/decline
// @access  {Specify access control as needed}
const declineRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;

    const requestToDecline = await Request.findById(requestId);

    if (!requestToDecline) {
      return res
        .status(404)
        .json({ success: false, error: "Request not found" });
    }

    // Remove the user's ID from approvalNeededFrom array if present
    const index = requestToDecline.approvalNeededFrom.indexOf(userId);

    if (index !== -1) {
      requestToDecline.approvalNeededFrom.splice(index, 1);
      // Add the user's ID to declinedBy array
      requestToDecline.declinedBy.push(userId);

      // Get all unique roles from users present in approvalNeededFrom array
      const uniqueRoles = Array.from(
        new Set(
          requestToDecline.approvalNeededFrom.map((userId) => {
            const userRole = User.findById(userId)?.role;
            return userRole;
          })
        )
      );

      // Check if approvalNeededFrom array is empty or only has users with lower hierarchy
      const canDecline =
        requestToDecline.approvalNeededFrom.length === 0 ||
        uniqueRoles.every(
          (role) => roleHierarchy[role] > roleHierarchy[userRole]
        );

      if (canDecline) {
        requestToDecline.status = "declined";
      }

      await requestToDecline.save();

      res
        .status(200)
        .json({ success: true, data: "Request declined successfully" });
    } else {
      return res.status(403).json({
        success: false,
        error: "User not authorized to decline this request",
      });
    }
  } catch (error) {
    console.error("Error declining request:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Associate a complaint with a request
// @route   PUT /api/mess/complaints/associate
// @access  {Specify access control as needed}
const associateComplaintWithRequest = async (req, res) => {
  try {
    const { requestId, complaintId } = req.body;
    const userId = req.user._id;

    // Find the complaint by ID
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res
        .status(404)
        .json({ success: false, error: "Complaint not found" });
    }

    // Check if the request is made by the current user
    if (request.madeById.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        error: "User not authorized to associate this complaint",
      });
    }

    const request = await Request.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, error: "Request not found" });
    }

    // Associate the complaint with the request
    request.complaintId = complaintId;
    request.complaintAssociated = true;

    // Save the updated request
    await request.save();

    res.status(200).json({
      success: true,
      data: "Complaint associated with the request successfully",
    });
  } catch (error) {
    console.error("Error associating complaint with request:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Add a remark to a request
// @route   PUT /api/mess/requests/:id/add-remark
// @access  {Specify access control as needed}
const addRemark = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { remark } = req.body;
    const userId = req.user._id;

    const request = await Request.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, error: "Request not found" });
    }

    // Check if the user is present in approvalNeededFrom, approvedBy, or declinedBy arrays
    const userPresentInArrays =
      request.approvalNeededFrom.includes(userId) ||
      request.approvedBy.includes(userId) ||
      request.declinedBy.includes(userId);

    if (!userPresentInArrays) {
      return res.status(403).json({
        success: false,
        error: "User not authorized to add remark to this request",
      });
    }

    // Add the remark to the request
    request.remarks.push({ madeById: userId, remark });

    // Save the updated request
    await request.save();

    res.status(200).json({
      success: true,
      data: "Remark added to the request successfully",
    });
  } catch (error) {
    console.error("Error adding remark to request:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Override approval for a request
// @route   PUT /api/mess/requests/:id/override-approval
// @access  {Specify access control as needed}
const overrideApproval = async (req, res) => {
  try {
    const { requestId, user2Id, roleOfUser2 } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    const request = await Request.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, error: "Request not found" });
    }

    if (roleHierarchy[userRole] <= roleHierarchy[roleOfUser2]) {
      return res.status(403).json({
        success: false,
        error: "User not authorized to override approval",
      });
    }

    // Check if both user2Id and userId are present in approvalNeededFrom array
    const user2Present = request.approvalNeededFrom.includes(user2Id);
    const currentUserPresent = request.approvalNeededFrom.includes(userId);

    if (!user2Present || !currentUserPresent) {
      return res.status(403).json({
        success: false,
        error: "User2 or current user not present in approvalNeededFrom",
      });
    }

    // Remove user2Id from approvalNeededFrom array
    request.approvalNeededFrom = request.approvalNeededFrom.filter(
      (id) => id.toString() !== user2Id.toString()
    );

    // Add current user to approvedBy array
    request.approvedBy.push(userId);

    // Check if approvalNeededFrom array is empty, update status to approved
    if (request.approvalNeededFrom.length === 0) {
      request.status = "approved";
    }

    // Save the updated request
    await request.save();

    res
      .status(200)
      .json({ success: true, data: "Approval overridden successfully" });
  } catch (error) {
    console.error("Error overriding approval:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Override decline for a request
// @route   PUT /api/mess/requests/:id/override-decline
// @access  {Specify access control as needed}
const overrideDecline = async (req, res) => {
  try {
    const { requestId, user2Id, roleOfUser2 } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    const request = await Request.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, error: "Request not found" });
    }

    if (roleHierarchy[userRole] <= roleHierarchy[roleOfUser2]) {
      return res.status(403).json({
        success: false,
        error: "User not authorized to override decline",
      });
    }

    // Check if both user2Id and userId are present in approvalNeededFrom array
    const user2Present = request.approvalNeededFrom.includes(user2Id);
    const currentUserPresent = request.approvalNeededFrom.includes(userId);

    if (!user2Present || !currentUserPresent) {
      return res.status(403).json({
        success: false,
        error: "User2 or current user not present in approvalNeededFrom",
      });
    }

    // Remove user2Id from approvalNeededFrom array
    request.approvalNeededFrom = request.approvalNeededFrom.filter(
      (id) => id.toString() !== user2Id.toString()
    );

    // Add current user to declinedBy array
    request.declinedBy.push(userId);

    // Check if approvalNeededFrom array is empty or only has users with lower hierarchy
    const canDecline =
      request.approvalNeededFrom.length === 0 ||
      request.approvalNeededFrom.every(
        (id) =>
          roleHierarchy[roleOfUser2] > roleHierarchy[User.findById(id).role]
      );

    // Update status to declined if conditions are met
    if (canDecline) {
      request.status = "declined";
    }

    // Save the updated request
    await request.save();

    res
      .status(200)
      .json({ success: true, data: "Decline overridden successfully" });
  } catch (error) {
    console.error("Error overriding decline:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export {
  createRequest,
  approveRequest,
  declineRequest,
  getFilteredRequests,
  forwardRequest,
  associateRequests,
  deleteRequest,
  associateComplaintWithRequest,
  addRemark,
  overrideApproval,
  overrideDecline,
};
