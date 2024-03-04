import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./connectDB.js";
import jobRoute from "./routes/jobRoute.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
const app = express();
dotenv.config();

/* Built - in Middleware */
app.use(cors());
app.use(cookieParser());
app.use(express.json());

/* Routing */
app.use("/api", jobRoute);
app.use("/api", userRoute);
app.use("/api", adminRoute);
/* Listening to Port */

app.listen(3001, (req, res) => {
  console.log("Listening to port 3000");
  connectDB();
});
