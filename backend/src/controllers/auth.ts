import { Request, Response } from "express";
import { db } from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { LoginSchema, RegisterSchema } from "../schemas/index.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedField = RegisterSchema.safeParse(req.body);

    if (!validatedField.success) {
      return res.status(400).json({ error: "Ungültige Felder!" });
    }

    const { fullName, username, password, confirmPassword } = validatedField.data

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Die Passwörter stimmen nicht überein!" });
    }

    const user = await db.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "Benutzer existiert bereits!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;

    const newUser = await db.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        profilePic: profilePic,
      },
    });

    if (newUser) {
      // generate token in a sec
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Ungültige Benutzerdaten!" });
    }
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedField = LoginSchema.safeParse(req.body);

    if (!validatedField.success) {
      return res.status(400).json({ error: "Ungültige Felder!" });
    }

    const { username, password } = validatedField.data

    //console.log(validatedField)
    //const { username, password } = req.body;
    const user = await db.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: "Ungültige Berechtigungsnachweise" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Ungültige Berechtigungsnachweise" });
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
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
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Erfolgreich ausgeloggt" });
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await db.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ error: "Benutzer nicht gefunden!" });
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};