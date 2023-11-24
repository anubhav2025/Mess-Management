import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { dayToNum } from "./constants.js";
import MenuItem from "./models/menuItemModel.js";
import asyncHandler from "./middleware/asyncHandler.js";

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

const funcSeq = asyncHandler(async function () {
	try {
		let menuItems = await MenuItem.find({
			messId: "655a1bb05aa164b76965dc05",
		}).exec();
		// console.log(menuItems);
		// Now menuItems should be an array

		// You can perform operations on menuItems here
		for (let item of menuItems) {
			item.seq = dayToNum[item.day] * 4 + Number(item.time);
			await item.save();
			// console.log("DONE");
		}
	} catch (err) {
		console.error(err);
	}
});

app.listen(port, function () {
	// funcSeq();
	console.log(`Server is running on port ${port}`);
});
