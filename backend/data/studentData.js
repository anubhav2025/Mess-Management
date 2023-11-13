import bcrypt from "bcryptjs";

const students = [
  {
    messId: "655274b2951333d3004ce568",
    image: "/images/user.png",
    role: "student",
    fname: "John",
    lname: "Doe",
    phone: "1234567890",
    regno: "123456",
    roomno: "101",
    email: "student@gmail.com",
    password: bcrypt.hashSync("student@007", 10),
  },
];

export default students;
