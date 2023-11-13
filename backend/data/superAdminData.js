import bcrypt from "bcryptjs";

const superadmins = [
  {
    name: "Super Admin",
    phone: "1234567890",
    role: "superAdmin",
    image: "/images/user.png",
    email: "superadmin@gmail.com",
    password: bcrypt.hashSync("superadmin@007", 10),
    isAdmin: true,
  },
];

export default superadmins;
