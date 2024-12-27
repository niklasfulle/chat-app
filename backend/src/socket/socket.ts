import { Server } from "socket.io";
import http from "http";
import express from "express";

// Create an Express application instance
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.IO server instance attached to the HTTP server
// Configure CORS settings to allow connections from specific origins and methods

const io = new Server(server, {
  cors: {
    origin: [`http://localhost:4173`], // Allow connections from this origin only
    methods: ["GET", "POST"], // Allow only GET and POST methods
  },
});

// Map to store user IDs and their corresponding socket IDs
const userSocketMap: { [key: string]: string } = {}; // { userId: socketId }

// Function to retrieve the socket ID associated with a user ID
export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

// Handle new socket connections
io.on("connection", (socket) => {
  // Extract the user ID from the connection query string
  const userId = socket.handshake.query.userId as string;

  // If a user ID is present, store the user ID and corresponding socket ID in the map
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle socket disconnection
  socket.on("disconnect", () => {
    // Remove the disconnected user's information from the map
    delete userSocketMap[userId];

    // Broadcast an updated list of online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export relevant objects for use in other parts of the application
export { app, io, server };