import Warden from "./models/users/wardenModel.js";
import Storekeeper from "./models/users/storekeeperModel.js";
import Accountant from "./models/users/accountantModel.js";
import Student from "./models/users/studentModel.js";
import SuperAdmin from "./models/users/superAdminModel.js";
import StudentMessManager from "./models/users/studentMessManagerModel.js";

export const roleModelMap = {
	warden: Warden,
	storeKeeper: Storekeeper,
	accountant: Accountant,
	student: Student,
	superAdmin: SuperAdmin,
	studentMessManager: StudentMessManager,
};
