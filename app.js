// app.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import listRouter from "./route/list.js";
import userRouter from "./route/user.js";
import loginRouter from "./route/login.js";
import { initDb, getDb } from "./database/connect.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

console.log("APP.JS STARTED");

// ---------------------
// Middleware
// ---------------------
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// ---------------------
// API Routes
// ---------------------
app.use("/auth", loginRouter);  // Login routes
app.use("/users", userRouter);  // User routes
app.use("/lists", listRouter);  // Todo/List routes

// Test database route
app.get("/test-db", async (req, res) => {
  try {
    const db = await getDb();
    const result = await db.command({ ping: 1 });
    if (result.ok === 1) {
      return res.send("Database Status: CONNECTED");
    }
    return res.status(500).send("Database Status: ERROR");
  } catch (err) {
    res.status(500).send("Database Status: NOT CONNECTED");
  }
});

// ---------------------
// SPA catch-all (frontend)
// ---------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ---------------------
// Start server
// ---------------------
initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
