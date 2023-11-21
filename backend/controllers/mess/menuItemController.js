import asyncHandler from "../../middleware/asyncHandler.js";
import MenuItem from "../../models/menuItemModel.js";

// @desc    Create menu Item
// @route   POST /api/orders
// @access  Private
const createMenuItem = asyncHandler(async (req, res) => {
  try {
    const { menuId, day, time, reviews, rating, numReviews, calories } =
      req.body;

    const menuItem = await MenuItem.create({
      menuId,
      day,
      time,
      reviews,
      rating,
      numReviews,
      calories,
    });

    return res.status(201).json(menuItem);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const getMenuItemByMenuId = asyncHandler(async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const menuItems = await MenuItem.find({ menuId });

    if (!menuItems) {
      return res.status(404).json({ error: "Menu Items not found" });
    }

    return res.status(200).json(menuItems);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { createMenuItem, getMenuItemByMenuId };
