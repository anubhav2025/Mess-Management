import bcrypt from "bcryptjs";

const wardens = [
  {
    collegeId: "655265f7bff5333fc7e7b4a7",
    messId: "655274b2951333d3004ce568",
    image: "/images/user.png",
    fname: "Alice",
    role: "warden",
    lname: "Johnson",
    phone: "1234567890",
    email: "warden@gmail.com",
    password: bcrypt.hashSync("warden@007", 10),
    // pendingRequests: "request-id-1",
  },
];

export default wardens;
