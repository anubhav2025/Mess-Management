import bcrypt from "bcryptjs";

const wardens = [
  {
    // collegeId: "your-college-id",
    // messId: "your-mess-id",
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
