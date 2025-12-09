import { Router } from "express";
import express from "express";

import { getAllUsers, createUser, getUser, updateUser, deleteUser } from "../controller/userController.js";
const router = Router();


router.get("/", getAllUsers);       // GET /users/
router.post("/", createUser);       // POST /users/
router.get("/:id", getUser);        // GET /users/:id
router.put("/:id", updateUser);     // PUT /users/:id
router.delete("/:id", deleteUser);


export default router;