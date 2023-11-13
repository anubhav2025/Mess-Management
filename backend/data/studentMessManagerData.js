import bcrypt from "bcryptjs";

const studentMessManagers = [
  {
    // messId: "your-mess-id",
    // wardenId: "your-warden-id",
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
    // requestsForApproval: "request-id-6",
  },
];

export default studentMessManagers;
