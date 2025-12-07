import { Router } from "express";
import express from "express";

import { login } from "../controller/loginController.js";

const router = Router();


router.post("/login", login);


export default router;
