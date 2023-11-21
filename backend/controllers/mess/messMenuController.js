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
    const messId = req.params.messId;
    const menu = await Menu.findOne({ messId }).populate(
      "monday.menuItem tuesday.menuItem wednesday.menuItem thursday.menuItem friday.menuItem saturday.menuItem sunday.menuItem"
    );

    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    return res.status(200).json(menu);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { getMenuByMessId, createMenu };
