import bcrypt from "bcryptjs";

const accountants = [
  {
    // messId:
    // wardenId:
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
