import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";

import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";

// Load environment variables from .env file
dotenv.config();

// Set the port number for the server
const PORT = process.env.PORT || 5001;

// Get the current directory path
const __dirname = path.resolve();

// Middleware to parse cookies and JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON request bodies

// Mount the authentication routes under the /api/auth path
app.use("/api/auth", authRoutes);

// Mount the message routes under the /api/messages path
app.use("/api/messages", messageRoutes);

// If the app is not in development mode, serve static files from the frontend build
if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Serve the index.html file for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});