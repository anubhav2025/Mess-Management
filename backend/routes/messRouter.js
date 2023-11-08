//prefix route '/api/mess'

import express from "express";
import expensesRoutes from "./mess/expensesRoutes.js";
import requestsRoutes from "./mess/requestRoutes.js";
// import expensesRoutes from "./mess/expensesRoutes";
// import { Router } from "express";

const router = express.Router();

router.use("/expenses", expensesRoutes);
router.use("/requests", requestsRoutes);
//add more

export default router;
