import asyncHandler from "../../middleware/asyncHandler.js";
import Menu from "../../models/menuModel.js";
import MenuItem from "../../models/menuItemModel.js";

// @desc    Create new Menu
// @route   POST /api/mess/menu/addMenu
// @access  Public
const createMenu = asyncHandler(async (req, res) => {
  try {
    // console.log(req.body);
    const { messId } = req.body;
    if (req.user && req.user?.messId !== messId) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const menu = await Menu.create({
      messId: messId,
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    });
    // console.log("HELLO");

    return res.status(201).json(menu);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc    Get Menu By Mess ID
// @route   GET /api/mess/menu/:messId   here id is mess id
// @access  Public
const getMenuByMessId = asyncHandler(async (req, res) => {
  try {
    const messId = req.params.messId;

    // Execute the query to get the menu
    const menu = await Menu.findOne({ messId: messId }).exec();

    console.log(menu);
    return res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { getMenuByMessId, createMenu };

// Might be used
//getMenuById
// if (req.user?.messId && req.user.messId !== messIdParams) {
//   res.status(404).json({ success: false, error: "Unauthorized" });
// }
// const messMenu = Menu.find({ messId: messIdParams });
// const menuId = messMenu._id;
// const daysOfWeekOrder = [
//   "monday",
//   "tuesday",
//   "wednesday",
//   "thursday",
//   "friday",
//   "saturday",
//   "sunday",
// ];
// const menuItems = await MenuItem.find({ menuId }).sort({
//   day: {
//     $function: {
//       body: `function(day) { return ${JSON.stringify(
//         daysOfWeekOrder
//       )}.indexOf(day); }`,
//     },
//   },
//   time: 1,
// });
// const organizedMenu = {};
// daysOfWeekOrder.forEach((day) => {
//   organizedMenu[day] = [];
// });
// menuItems.forEach((menuItem) => {
//   organizedMenu[menuItem.day].push(menuItem);
// });

// const jsonMenu = JSON.stringify(menu);
