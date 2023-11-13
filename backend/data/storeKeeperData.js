import bcrypt from "bcryptjs";

const storekeepers = [
  {
    // messId: "your-mess-id",
    // wardenId: "your-warden-id",
    image: "/images/user.png",
    role: "storekeeper",
    fname: "Michael",
    lname: "Johnson",
    phone: "1234567890",
    email: "storekeeper@gmail.com",
    password: bcrypt.hashSync("storekeeper@007", 10),
    // pendingRequestsFromDown: "request-id-9",
    // requestsForApproval: "request-id-10",
  },
];

export default storekeepers;
