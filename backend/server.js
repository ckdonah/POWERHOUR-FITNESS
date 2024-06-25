import express from "express";
import connectDB from "./config/connectDB.js";
import colors from "colors";
import reviewRouter from "./routes/reviewRouter.js";
import offerRouter from "./routes/offerRouter.js";
import courseRouter from "./routes/courseRouter.js";
import eventRouter from "./routes/eventRouter.js";
import contactRouter from "./routes/contactRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import userRouter from "./routes/userRouter.js";
import trainerRouter from "./routes/trainerRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const { PORT } = process.env;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
await connectDB();


// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/user", userRouter);
app.use("/review", reviewRouter);
app.use("/offer", offerRouter);
app.use("/course", courseRouter);
app.use("/event", eventRouter);
app.use("/contact", contactRouter);
app.use("/booking", bookingRouter);
app.use("/trainer", trainerRouter);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () =>
  console.log(
    `:::`.green.bold,
    `Server running on port`.yellow.bold,
    `http://localhost:${PORT}`.green.underline.bold
  )
);
