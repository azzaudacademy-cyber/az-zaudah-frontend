import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();


// Test route:
app.get("/", (req, res) => {
  res.send("Az-Zaudah Backend is running!");
});


// Example GET users:
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});