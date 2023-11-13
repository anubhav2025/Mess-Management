import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
// importing models
import Student from "./models/studentModel.js";
import Accountant from "./models/accountantModel.js";
import College from "./models/collegeModel.js";
import Studentmanager from "./models/studentMessManagerModel.js";
import Storekeeper from "./models/storeKeeperModel.js";
import Superadmin from "./models/superAdminModel.js";
import Warden from "./models/wardenModel.js";
//importing data corresponding to each model
import students from "./data/studentData.js";
import accountants from "./data/accountantData.js";
import colleges from "./data/collegeData.js";
import studentMessManagers from "./data/studentMessManagerData.js";
import storekeepers from "./data/storeKeeperData.js";
import superadmins from "./data/superAdminData.js";
import wardens from "./data/wardenData.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Student.deleteMany();
    await Accountant.deleteMany();
    await College.deleteMany();
    await Studentmanager.deleteMany();
    await Storekeeper.deleteMany();
    await Superadmin.deleteMany();
    await Warden.deleteMany();

    await Student.insertMany(students);
    await Accountant.insertMany(accountants);
    await College.insertMany(colleges);
    await Studentmanager.insertMany(studentMessManagers);
    await Storekeeper.insertMany(storekeepers);
    await Superadmin.insertMany(superadmins);
    await Warden.insertMany(wardens);

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
