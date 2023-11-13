import bcrypt from "bcryptjs";

const accountants = [
  {
    messId: "655274b2951333d3004ce568",
    wardenId: "65526ece4269c175b7000746",
    image: "/images/user.png",
    role: "accountant",
    fname: "Accountant",
    lname: "One",
    phone: "1234567890",
    email: "accountant@gmail.com",
    password: bcrypt.hashSync("accountant@007", 10),
  },
];

export default accountants;
