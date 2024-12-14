import express from "express";
import { login, logout, signup, getMe } from "../controllers/auth.js";
import protectRoute from "../middleware/protectRoute.js";

// Create an Express router object
const router = express.Router();

// Define routes for authentication:

// GET /me: This route fetches the currently authenticated user's information.
// It requires authorization using the protectRoute middleware before proceeding.
router.get("/me", protectRoute, getMe);

// POST /signup: This route handles user signup logic using the signup controller function.
router.post("/signup", signup);

// POST /login: This route handles user login logic using the login controller function.
router.post("/login", login);

// POST /logout: This route handles user logout logic using the logout controller function.
router.post("/logout", logout);

// Export the router object for use in the main app
export default router;