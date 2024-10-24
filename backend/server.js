// External imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

// Internal imports
import connectDB from "./connections/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// App config
app.use(express.json());
app.use(cookieParser());

// Get the home route
app.get("/", (req, res) => {
  res.send("I am home route");
});

// Get the routes
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

// Run the server
app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT}`);
  await connectDB();
});
