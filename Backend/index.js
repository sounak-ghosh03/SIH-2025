import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import migrantRoutes from "./routes/migrantRoutes.js";
import ehrRoutes from "./routes/ehrRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Root route
app.get("/", (req, res) => res.send("API running"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/migrants", migrantRoutes);
app.use("/api/ehr", ehrRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/admin", adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
