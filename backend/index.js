import express from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import authenticateToken from "./auth.js";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

const secret = process.env.JWT_SECRET;

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exits with this username",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      secret,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "User created successfully",
      user: newUser,
      userId: newUser.id,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "User not found, please signup",
      });
    }

    const authPassword = await bcrypt.compare(password, existingUser.password);

    if (!authPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "User signed in successfully",
      userId: existingUser.id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error signing in",
      error: err.message,
    });
  }
});

app.get("/userdata",  (req, res) => {
  // Dummy data for the dashboard
  const data = {
    summary: [
      { title: "Total Vehicles", value: 220 },
      { title: "Total Tyres", value: 456 },
      { title: "Tyres on Wheel", value: 345 },
      { title: "Available Stock", value: 276 },
      { title: "Total Scrap", value: 179 },
      { title: "Scrap Tyres", value: 225 },
      { title: "Sent to Retread", value: 156 },
      { title: "Reusable Tyres", value: 234 },
    ],
    alerts: [
      { name: "Unidentified Tyre", count: 351 },
      { name: "Missing Tyre", count: 126 },
      { name: "Low NSD", count: 102 },
      { name: "Vehicle Pending", count: 196 },
      { name: "Pending Alignment", count: 165 },
      { name: "Pending Rotation", count: 143 },
      { name: "Tyre Defects", count: 257 },
    ],
    inventory: [
        { nsd: "4 - 8", new: 45, retread: 69, scrap: 69, total: 185 },
        { nsd: "8 - 12", new: 56, retread: 14, scrap: 14, total: 86 },
        { nsd: "12 - 16", new: 84, retread: 41, scrap: 41, total: 194 },
        { nsd: "16 - 20", new: 26, retread: 23, scrap: 23, total: 72 },
        { nsd: "20 - 24", new: 72, retread: 21, scrap: 21, total: 123 },
    ],
    actions: [
      {
        date: "22 Aug 24",
        category: "Inspection",
        tyreNo: "CZ8903132021",
        brand: "Bridgestone",
        model: "XYZ123PQR",
        size: "1000/20",
        vehicleNo: "RJ 13 BR 2299",
        status: "Completed",
      },
      {
        date: "22 Aug 24",
        category: "Alignment",
        tyreNo: "CZ8903132022",
        brand: "Bridgestone",
        model: "XYZ123PQR",
        size: "1000/20",
        vehicleNo: "RJ 13 BR 2209",
        status: "Completed",
      },
      {
        date: "22 Aug 24",
        category: "Rotation",
        tyreNo: "CZ8903132023",
        brand: "Bridgestone",
        model: "XYZ123PQR",
        size: "1000/20",
        vehicleNo: "RJ 13 BR 2209",
        status: "Completed",
      },
      {
        date: "22 Aug 24",
        category: "Defects Correction",
        tyreNo: "CZ8903132024",
        brand: "Bridgestone",
        model: "XYZ123PQR",
        size: "1000/20",
        vehicleNo: "RJ 13 BR 2209",
        status: "Completed",
      },
      {
        date: "22 Aug 24",
        category: "Removal",
        tyreNo: "CZ8903132025",
        brand: "Bridgestone",
        model: "XYZ123PQR",
        size: "1000/20",
        vehicleNo: "RJ 13 BR 2209",
        status: "Completed",
      },
      {
        date: "22 Aug 24",
        category: "Fitment",
        tyreNo: "CZ8903132026",
        brand: "Bridgestone",
        model: "XYZ123PQR",
        size: "1000/20",
        vehicleNo: "RJ 13 BR 2209",
        status: "Completed",
      },
    ],
    chartData: {
      brandData: [300, 200, 400, 345, 150, 200],
      monthData: {
        purchases: [640, 580, 700, 750, 500, 600],
        retread: [300, 250, 320, 350, 270, 290],
        scrap: [100, 150, 120, 180, 140, 130],
      },
    },
  };
  res.json(data);
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
