//prefix route '/api/mess/menu'

import express from "express";
import {
  createMenuItem,
  getMenuItemArrayByMessID,
  getMenuItemByMenuId,
} from "../../controllers/mess/menuItemController.js";
import {
  getMenuByMessId,
  createMenu,
} from "../../controllers/mess/messMenuController.js";
// import { getPendingRequests } from "../../controllers/mess/requestsController.js";

const router = express.Router();

// router.get("/pending", getPendingRequests);
router.post("/addMenuItem", createMenuItem);
router.get("/menuItem/:menuId", getMenuItemByMenuId); //id is menu id
router.post("/addMenu", createMenu);
router.get("/:messId", getMenuByMessId); //id is mess id
router.get("/menuItems/:messId/array", getMenuItemArrayByMessID);
//add more

export default router;
