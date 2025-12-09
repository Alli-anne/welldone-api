import { Router } from "express";
import express from "express";
import { getLists, createList, getListByDate } from "../controller/listController.js";
const router = Router();


router.get("/", getLists);                // GET /lists/
router.post("/", createList);             // POST /lists/
router.get("/date/:date", getListByDate)


export default router;