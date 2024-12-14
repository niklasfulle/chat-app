import { Request, Response } from "express";
import { db } from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { LoginSchema, RegisterSchema } from "../schemas/index.js";

export const signup = async (req: Request, res: Response) => {
  try {
    // Validate user input using RegisterSchema
    const validatedField = RegisterSchema.safeParse(req.body);

    // Return 400 Bad Request if validation fails
    if (!validatedField.success) {
      return res.status(400).json({ error: "Ungültige Felder!" });
    }

    // Destructure validated user data
    const { firstname, lastname, username, password, confirmPassword } = validatedField.data

    // Check password and Return 400 Bad Request if passwords don't match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Die Passwörter stimmen nicht überein!" });
    }

    // Check for existing user with the same username
    const user = await db.user.findUnique({ where: { username } });

    // Return 400 Bad Request if username already exists
    if (user) {
      return res.status(400).json({ error: "Benutzer existiert bereits!" });
    }

    // Generate secure password hash using bcrypt
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //https://avatar-placeholder.iran.liara.run/
    //const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;

    // Use a placeholder profile picture
    const profilePic = "user.png"

    // Create a new user in the database
    const newUser = await db.user.create({
      data: {
        firstname,
        lastname,
        username,
        password: hashedPassword,
        profilePic: profilePic,
      },
    });

    if (newUser) {
      // Generate token for authentication
      generateToken(newUser.id, res);

      // Return 201 Created with user information and token
      res.status(201).json({
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      // Return 400 Bad Request if user creation fails
      res.status(400).json({ error: "Ungültige Benutzerdaten!" });
    }
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validate user input using LoginSchema
    const validatedField = LoginSchema.safeParse(req.body);

    // Return 400 Bad Request if validation fails
    if (!validatedField.success) {
      return res.status(400).json({ error: "Ungültige Felder!" });
    }

    // Destructure username and password from validated data
    const { username, password } = validatedField.data

    // Find user in the database by username
    const user = await db.user.findUnique({ where: { username } });

    // Return 400 Bad Request if username is not found
    if (!user) {
      return res.status(400).json({ error: "Ungültige Berechtigungsnachweise" });
    }

    // Compare entered password with hashed password in database
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    // Return 400 Bad Request if password doesn't match
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Ungültige Berechtigungsnachweise" });
    }

    // Generate token for authentication
    generateToken(user.id, res);

    // Return 200 OK with user information and token
    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the JWT cookie by setting its maxAge to 0
    res.cookie("jwt", "", { maxAge: 0 });

    // Send a 200 OK response with a success message
    res.status(200).json({ message: "Erfolgreich ausgeloggt" });
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    // Extract user ID from the request object (assuming middleware sets it)
    const userId = req.user.id;

    // Find user in the database by ID
    const user = await db.user.findUnique({ where: { id: userId } });

    // Return 404 Not Found if user is not found
    if (!user) {
      return res.status(404).json({ error: "Benutzer nicht gefunden!" });
    }

    // Return user information in a 200 OK response
    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};