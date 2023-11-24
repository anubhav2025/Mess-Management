import bcrypt from "bcryptjs";

const studentMessManagers = [
	{
		messId: "655274b2951333d3004ce568",
		wardenId: "65526ece4269c175b7000746",
		image: "/images/user.png",
		role: "studentManager",
		fname: "Manager",
		lname: "One",
		phone: "1234567890",
		regno: "123457",
		roomno: "102",
		email: "studentmanager@gmail.com",
		password: bcrypt.hashSync("studentmanager@007", 10),
		// pendingRequestsFromDown: "request-id-5",
		// requestsSentForApproval: "request-id-6",
	},
];

export default studentMessManagers;
