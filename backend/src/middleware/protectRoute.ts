import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { db } from "../db/prisma.js";

// Define the structure of the decoded token
interface DecodedToken extends JwtPayload {
  userId: string; // Add the userId property to the decoded token
}

// Extend the Request interface to include a user property
declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string; // Add the user's ID to the request object
      };
    }
  }
}

// Middleware function to protect routes
const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the JWT token from the cookies
    const token = req.cookies.jwt;

    // Check if a token is provided
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Kein Token vorhanden" });
    }

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Check if the token is valid
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Ungültiger Token" });
    }

    // Find the user associated with the decoded token
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, firstname: true, lastname: true, profilePic: true },
    });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "Benutzer nicht gefunden!" });
    }

    // Attach the user information to the request object
    req.user = user;

    // Call the or route handler
    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;