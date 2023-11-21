import Warden from "./models/users/wardenModel.js";
import Storekeeper from "./models/users/storeKeeperModel.js";
import Accountant from "./models/users/accountantModel.js";
import Student from "./models/users/studentModel.js";
import SuperAdmin from "./models/users/superAdminModel.js";
import StudentMessManager from "./models/users/studentMessManagerModel.js";
import CollegeAdmin from "./models/users/collegeAdminModel.js";

export const roleModelMap = {
  warden: Warden,
  storeKeeper: Storekeeper,
  accountant: Accountant,
  student: Student,
  superAdmin: SuperAdmin,
  studentMessManager: StudentMessManager,
  //   collegeAdmin: CollegeAdmin,
};
