import bcrypt from "bcryptjs";

const storekeepers = [
<<<<<<< HEAD
  {
    userId: "655a209877910d58566710e0",
    wardenId: "655a22eca3920fb6e9989dc8",
    // pendingRequestsFromDown: "request-id-9",
    // requestsForApproval: "request-id-10",
  },
=======
	{
		messId: "655274b2951333d3004ce568",
		wardenId: "65526ece4269c175b7000746",
		image: "/images/user.png",
		role: "storekeeper",
		fname: "Michael",
		lname: "Johnson",
		phone: "1234567890",
		email: "storekeeper@gmail.com",
		password: bcrypt.hashSync("storekeeper@007", 10),
		// pendingRequestsFromDown: "request-id-9",
		// requestsSentForApproval: "request-id-10",
	},
>>>>>>> 21a87729ff74bce97368fbe3965c33623b285bd4
];

export default storekeepers;
