import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const UserRepository = AppDataSource.getRepository(User);

router.post(
  "/auth/register",
  [
  ],
  async (req: Request, res: Response): Promise<void> => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { firstName, lastName, email, password, contactNumber } = req.body;
    try {
      const existingUser = await UserRepository.findOne({ where: { email } });
      if (existingUser) {
         res.status(400).json({ message: "User already exists" });
         return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = UserRepository.create({ firstName, lastName, email, passwordHash: hashedPassword, contactNumber: contactNumber });
      await UserRepository.save(newUser);

       res.status(201).json({ message: "User registered successfully" });
       return;
    } catch (error) {
      console.error("Error registering user:", error);
       res.status(500).json({ message: "Internal server error" });
       return;
    }
  }
);

router.post(
  "/auth/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    try {
      const user = await UserRepository.findOne({ where: { email } });
      if (!user) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, contactNumber: user.contactNumber } });
    return;
    } catch (error) {
      console.error("Error logging in user:", error);
     res.status(500).json({ message: "Internal server error" });
     return;
    }
  }
);

export default router;
