import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import listRoutes from "./route/listPath.js";
import userRoutes from "./route/user.js";
import loginRoutes from "./route/login.js";

import { initDb, getDb } from "./database/connect.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: true
}));

// MOUNT ROUTES CORRECTLY
app.use("/auth", loginRoutes);   // POST /auth
app.use("/users", userRoutes);   // GET /users
app.use("/lists", listRoutes);   // GET /lists

initDb().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});
