import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"

import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser.
app.use(cookieParser());

app.use("/api", router);
app.use("/api/users", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
