import asyncHandler from "../../middleware/asyncHandler.js";
import Menu from "../../models/menuModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createMenu = asyncHandler(async (req, res) => {
  try {
    const {
      messId,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    } = req.body;

    const menu = await Menu.create({
      messId,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });

    return res.status(201).json(menu);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const getMenuByMessId = asyncHandler(async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const daysOfWeekOrder = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    const menuItems = await MenuItem.find({ menuId }).sort({
      day: {
        $function: {
          body: `function(day) { return ${JSON.stringify(
            daysOfWeekOrder
          )}.indexOf(day); }`,
        },
      },
      time: 1,
    });

    const organizedMenu = {};

    daysOfWeekOrder.forEach((day) => {
      organizedMenu[day] = [];
    });

    menuItems.forEach((menuItem) => {
      organizedMenu[menuItem.day].push(menuItem);
    });

    return res.status(200).json(organizedMenu);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { getMenuByMessId, createMenu };
