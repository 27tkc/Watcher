import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/payments", paymentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successfully connecting to the database
    app.listen(2700, () => {
      console.log("Server is running on port 2700");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
