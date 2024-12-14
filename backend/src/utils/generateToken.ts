import jwt from "jsonwebtoken";
import { Response } from "express";

// Function to generate a JWT token for a given user ID
const generateToken = (userId: string, res: Response) => {
  // Create a JWT token with the user ID as payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d", // Token expires in 15 days
  });

  // Set the JWT token as an HTTP-only cookie
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS,
    httpOnly: true, // prevent XSS cross site scripting
    sameSite: "strict", // CSRF attack cross-site request forgery
    secure: process.env.NODE_ENV !== "development", // HTTPS
  });

  return token;
};

export default generateToken;