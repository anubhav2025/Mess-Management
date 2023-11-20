import bcrypt from "bcryptjs";

const storekeepers = [
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
];

export default storekeepers;
