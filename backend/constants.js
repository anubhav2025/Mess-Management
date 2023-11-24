import Warden from "./models/users/wardenModel.js";
import Storekeeper from "./models/users/storekeeperModel.js";
import Accountant from "./models/users/accountantModel.js";
import Student from "./models/users/studentModel.js";
import SuperAdmin from "./models/users/superAdminModel.js";
import StudentMessManager from "./models/users/studentMessManagerModel.js";

const roleModelMap = {
	Warden: Warden,
	StoreKeeper: Storekeeper,
	Accountant: Accountant,
	Student: Student,
	SuperAdmin: SuperAdmin,
	StudentMessManager: StudentMessManager,
};

const nonAdminRoles = [
	"accountant",
	"student",
	"storekeeper",
	"warden",
	"studentMessManager",
];
const firstCapNonAdminRoles = [
	"Accountant",
	"Student",
	"Storekeeper",
	"Warden",
	"StudentMessManager",
];

const roleHierarchy = {
	SuperAdmin: 1,
	CollegeAdmin: 2,
	Warden: 3,
	Storekeeper: 4,
	Accountant: 4,
	StudentMessManager: 5,
	Student: 6,
};

const dayToNum = {
	monday: 0,
	tuesday: 1,
	wednesday: 2,
	thursday: 3,
	friday: 4,
	saturday: 5,
	sunday: 6,
};

export {
	roleModelMap,
	nonAdminRoles,
	firstCapNonAdminRoles,
	roleHierarchy,
	dayToNum,
};
