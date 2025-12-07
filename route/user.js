import { Router } from "express";
import express from "express";

import { getAllUsers, createUser, getUser, updateUser, deleteUser } from "../controller/userController.js";
const router = Router();


router.get("/users", getAllUsers);
router.post("/add", createUser);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


export default router;