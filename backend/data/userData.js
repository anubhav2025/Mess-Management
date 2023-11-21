import bcrypt from "bcryptjs";

const users = [
  {
    role: "superAdmin",
    fname: "Super",
    lname: "Admin",
    phone: "1234567890",
    email: "superadmin@gmail.com",
    password: bcrypt.hashSync("superadmin@007", 10),
    image: "/images/user.png",
    messId: "655a1bb05aa164b76965dc05",
    collegeAdminId: "655a1dd5f4e86828d9888f31",
    roleSpecificData: null, //object id to others attributes of that role
  },
  {
    role: "accountant",
    fname: "Accountant",
    lname: "One",
    phone: "1234567890",
    email: "accountant@gmail.com",
    password: bcrypt.hashSync("accountant@007", 10),
    image: "/images/user.png",
    messId: "655a1bb05aa164b76965dc05",
    collegeAdminId: "655a1dd5f4e86828d9888f31",
    roleSpecificData: null, //object id to others attributes of that role
  },
  {
    role: "storekeeper",
    fname: "Michael",
    lname: "Johnson",
    phone: "1234567890",
    email: "storekeeper@gmail.com",
    password: bcrypt.hashSync("storekeeper@007", 10),
    image: "/images/user.png",
    messId: "655a1bb05aa164b76965dc05",
    collegeAdminId: "655a1dd5f4e86828d9888f31",
    roleSpecificData: null, //object id to others attributes of that role
  },
  {
    role: "studentMessManager",
    fname: "Student",
    lname: "Manager",
    phone: "1234567890",
    email: "studentmanager@gmail.com",
    password: bcrypt.hashSync("studentmanager@007", 10),
    image: "/images/user.png",
    messId: "655a1bb05aa164b76965dc05",
    collegeAdminId: "655a1dd5f4e86828d9888f31",
    roleSpecificData: null, //object id to others attributes of that role
  },
  {
    role: "student",
    fname: "John",
    lname: "Doe",
    phone: "1234567890",
    email: "student@gmail.com",
    password: bcrypt.hashSync("student@007", 10),
    image: "/images/user.png",
    messId: "655a1bb05aa164b76965dc05",
    collegeAdminId: "655a1dd5f4e86828d9888f31",
    roleSpecificData: null, //object id to others attributes of that role
  },
  {
    role: "warden",
    fname: "Alice",
    lname: "Johnson",
    phone: "1234567890",
    email: "warden@gmail.com",
    password: bcrypt.hashSync("warden@007", 10),
    image: "/images/user.png",
    messId: "655a1bb05aa164b76965dc05",
    collegeAdminId: "655a1dd5f4e86828d9888f31",
    roleSpecificData: null, //object id to others attributes of that role
  },
];

export default users;
