import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.js";
// Create an Express router object
const router = express.Router();

// Define routes for message management:

// GET /conversations: This route retrieves a list of users for the sidebar
// to display potential conversation partners. It requires authorization
// using the protectRoute middleware.
router.get("/conversations", protectRoute, getUsersForSidebar);

// GET /:id: This route fetches messages for a specific conversation
// identified by the ":id" parameter. It requires authorization using
// protectRoute before proceeding.
router.get("/:id", protectRoute, getMessages);

// POST /send/:id: This route handles sending a new message to a
// specific conversation identified by the ":id" parameter. It requires
// authorization using protectRoute before processing the message.
router.post("/send/:id", protectRoute, sendMessage);

// Export the router object for use in the main app
export default router;