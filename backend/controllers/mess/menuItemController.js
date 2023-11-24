import asyncHandler from "../../middleware/asyncHandler.js";
import MenuItem from "../../models/menuItemModel.js";

// @desc    Create new MenuItem
// @route   POST /api/mess/menu/addMenuItem
// @access  Private
const createMenuItem = asyncHandler(async (req, res) => {
	try {
		const { menuId, itemName, day, time, calories } = req.body;

		const menuItem = await MenuItem.create({
			menuId: menuId,
			itemName: itemName,
			day: day,
			time: time,
			calories: calories,
		});

		// console.log(menuItem);

		return res.status(201).json(menuItem);
	} catch (error) {
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

// @desc    Get MenuItems by Menu ID
// @route   GET /api/mess/menu/menuItems/:menuId
// @access  Public
const getMenuItemByMenuId = asyncHandler(async (req, res) => {
	try {
		console.log(req.params);
		const menuId = req.params.menuId;
		const menuItems = await MenuItem.find({ menuId: menuId });

		if (!menuItems) {
			return res.status(404).json({ error: "Menu Items not found" });
		}

		return res.status(200).json(menuItems);
	} catch (error) {
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

// @desc    Get MenuItems by Menu ID
// @route   GET /api/mess/menu/menuItems/:messID/array
// @access  Public
const getMenuItemArrayByMessID = asyncHandler(async (req, res) => {
	try {
		// console.log("getMenuItemArrayByMessID called");
		console.log(req.params);
		// console.log(req.body);
		const messId = req.params.messId;
		const menuItems = await MenuItem.find({ messId });

		if (!menuItems) {
			return res.status(404).json({ error: "Menu Items not found" });
		}
		// console.log(menuItems);
		menuItems.sort((a, b) => a.seq - b.seq);
		// console.log(menuItems);
		return res.status(200).json(menuItems);
	} catch (error) {
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

export { createMenuItem, getMenuItemByMenuId, getMenuItemArrayByMessID };
