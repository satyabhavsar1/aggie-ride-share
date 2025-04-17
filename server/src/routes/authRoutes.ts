import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const router = express.Router();
const UserRepository = AppDataSource.getRepository(User);

export const sendVerificationEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"RideShare TAMU" <no-reply@rideshare.com>',
    to: email,
    subject: "Verify your TAMU email",
    text: `Your verification code is: ${code}. Please visit http://aggie-ride-share-61fa93f77105.herokuapp.com/verify to verify your email.`,
  };

  await transporter.sendMail(mailOptions);
};

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
      if (!email.endsWith("@tamu.edu")) {
        res.status(400).json({ message: "Only @tamu.edu emails allowed" });
        return;
      }
    
      const existingUser = await UserRepository.findOne({ where: { email } });
      if (existingUser) {
         res.status(400).json({ message: "User already exists" });
         return;
      }
      const code = Math.floor(100000 + Math.random() * 900000).toString(); 
      const saltRounds = 10;
      const hashedCode = await bcrypt.hash(code, saltRounds);

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = UserRepository.create({ firstName, lastName, email, isVerified: false,verificationCode:hashedCode, passwordHash: hashedPassword, contactNumber: contactNumber });
      await UserRepository.save(newUser);
      
      await sendVerificationEmail(email, code);

       res.status(201).json({ message: "User registered successfully" });
       return;
    } catch (error) {
      console.log("error", error);
       res.status(500).json({ message: "Internal server error" });
       return;
    }
  }
);

router.post('/auth/verify' , [], async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const user = await UserRepository.findOne({ where: { email } });
  if(!user) {
    res.status(400).json({ message: "Invalid code" });
    return;
  }
  const isValid = await bcrypt.compare(code, user.verificationCode);

  if (!isValid) {
    res.status(400).json({ message: "Invalid code" });
    return;
  }

  user.isVerified = true;
  await UserRepository.save(user);

  res.status(200).json({ message: "Email verified successfully" });
  return;
});


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

      if(!user.isVerified) {
        res.status(400).json({ message: "Your email is not verified. Please verify email and try again." });
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
