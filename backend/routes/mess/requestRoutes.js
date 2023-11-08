//prefix route '/api/mess/requests'

import express from "express";
import { getPendingRequests } from "../../controllers/mess/requestsController.js";

const router = express.Router();

router.get("/pending", getPendingRequests);
//add more

export default router;
