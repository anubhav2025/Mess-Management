export const BASE_URL =
	process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
export const USERS_URL = "http://localhost:5000/api/users";

const textToRoute = {
	"weekly menu": "menu/weekly",
	"items & reviews": "menu/items/all",
	"add a complaint": "complaints/add",
	latest: "complaints/latest",
	"top voted": "complaints/top",
};

const timeNumToMeal = {
	1: "Breakfast",
	2: "Lunch",
	3: "Supper",
	4: "Dinner",
};

export { textToRoute, timeNumToMeal };
