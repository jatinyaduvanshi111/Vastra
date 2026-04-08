import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";   // 🔥 NEW

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connect
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Vastra backend is working");
});

// ================= ROUTES =================

// Products
app.use("/api/products", productRoutes);

// Authentication
app.use("/api/auth", authRoutes);

// 🔥 User (Address / Wishlist / Cart future)
app.use("/api/user", userRoutes);

// ==========================================

export default app;