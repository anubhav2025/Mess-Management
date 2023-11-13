import {
	Warden,
	Storekeeper,
	Accountant,
	Student,
	SuperAdmin,
	StudentMessManager,
} from "../models/index.js";

export const roleModelMap = {
   "warden": Warden,
   "storeKeeper": Storekeeper,
   "accountant": Accountant,
   "student": Student,
   "superAdmin": SuperAdmin,
   "studentMessManager": StudentMessManager,
};