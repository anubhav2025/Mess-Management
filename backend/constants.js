import Warden from "./models/users/wardenModel.js";
import Storekeeper from "./models/storeKeeperModel.js";
import Accountant from "./models/accountantModel.js";
import Student from "./models/studentModel.js";
import SuperAdmin from "./models/superAdminModel.js";
import StudentMessManager from "./models/studentMessManagerModel.js";

export const roleModelMap = {
	warden: Warden,
	storeKeeper: Storekeeper,
	accountant: Accountant,
	student: Student,
	superAdmin: SuperAdmin,
	studentMessManager: StudentMessManager,
};
