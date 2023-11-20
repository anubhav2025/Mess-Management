//prefix route '/api'

import express from "express";
import messRouter from "./messRouter.js";
const router = express.Router();

router.use("/mess", messRouter);

export default router;
