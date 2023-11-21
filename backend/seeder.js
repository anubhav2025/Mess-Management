import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
// importing models
import Student from "./models/users/studentModel.js";
import Accountant from "./models//users/accountantModel.js";
import CollegeAdmin from "./models/users/collegeAdminModel.js";
import Studentmanager from "./models/users/studentMessManagerModel.js";
import Storekeeper from "./models/users/storeKeeperModel.js";
import Superadmin from "./models/users/superAdminModel.js";
import Warden from "./models/users/wardenModel.js";
import Mess from "./models/messModel.js";
import User from "./models/users/userModel.js";

//importing data corresponding to each model
import students from "./data/studentData.js";
import accountants from "./data/accountantData.js";
import collegeadmins from "./data/collegeAdminData.js";
import studentMessManagers from "./data/studentMessManagerData.js";
import storekeepers from "./data/storeKeeperData.js";
import superadmins from "./data/superAdminData.js";
import wardens from "./data/wardenData.js";
import messes from "./data/messData.js";
import users from "./data/userData.js";
// import roleindexes from "./data/roleIndexData.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // await Student.deleteMany();
    // await Accountant.deleteMany();
    // await CollegeAdmin.deleteMany();
    // await Studentmanager.deleteMany();
    // await Storekeeper.deleteMany();
    // await Superadmin.deleteMany();
    // await Warden.deleteMany();
    // await Mess.deleteMany();

    // await CollegeAdmin.insertMany(collegeadmins);
    // await Student.insertMany(students);
    // await Accountant.insertMany(accountants);
    // await Studentmanager.insertMany(studentMessManagers);
    // await Storekeeper.insertMany(storekeepers);
    await Superadmin.insertMany(superadmins);
    // await Warden.insertMany(wardens);
    // await Mess.insertMany(messes);
    // await Roleindex.insertMany(roleindexes);
    // await User.insertMany(users);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Student.deleteMany();
    await Accountant.deleteMany();
    await College.deleteMany();
    await Studentmanager.deleteMany();
    await Storekeeper.deleteMany();
    await Superadmin.deleteMany();
    await Warden.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
