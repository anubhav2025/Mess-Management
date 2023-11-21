import bcrypt from "bcryptjs";

const studentMessManagers = [
<<<<<<< HEAD
  {
    userId: "655a209877910d58566710e1",
    wardenId: "655a22eca3920fb6e9989dc8",
    regno: "20214065",
    roomno: "102",
    // pendingRequestsFromDown: "request-id-5",
    // requestsForApproval: "request-id-6",
  },
=======
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
>>>>>>> 21a87729ff74bce97368fbe3965c33623b285bd4
];

export default studentMessManagers;
