import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser.
app.use(cookieParser());

app.use("/api", router);

// app.get("/", (req, res) => {
// 	res.send("Api is running....");
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));
