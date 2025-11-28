import { Router } from "express";
import express from "express";
import { getLists, createList, getListByDate } from "../controller/listController.js";
const router = Router();


router.get("/lists", getLists);
router.post("/add", createList);
router.get("/lists/${date}", getListByDate);


export default router;