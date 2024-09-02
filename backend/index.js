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
      { size: "NSD", new: 45, refread: 0, scrap: 65, total: 110 },
      { size: "8-4", new: 46, refread: 9, scrap: 69, total: 124 },
      { size: "12-16", new: 64, refread: 41, scrap: 89, total: 194 },
      { size: "16-20", new: 26, refread: 23, scrap: 23, total: 72 },
      { size: "20-24", new: 72, refread: 21, scrap: 21, total: 123 },
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
      brandWise: {
        labels: ["JK Tyres", "CEAT", "Apollo", "Bridgestone", "Vikrant", "MRF"],
        data: [200, 300, 250, 345, 150, 400],
      },
      monthWise: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        purchases: [800, 950, 750, 640, 900],
        refread: [600, 700, 650, 500, 720],
        scrap: [400, 300, 500, 450, 600],
      },
    },
  };
  res.json(data);
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
