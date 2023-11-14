import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

import helmet from 'helmet';
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser.
app.use(cookieParser());

app.use("/api", router);
app.use("/api/users", authRoutes);

// Apply CORS middleware
// app.use(cors({
//     origin: 'http://localhost:3000', // or '*' to allow requests from any origin (not recommended in production)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust the allowed HTTP methods as needed
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
// }));

// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

// app.get("/", (req, res) => {
   // 	res.send("Api is running....");
   // });
   
   app.listen(port, () => console.log(`Server is running on port ${port}`));
   