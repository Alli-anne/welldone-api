import {getDb} from "../database/connect.js";
import { ObjectId } from "mongodb";

export async function getLists(req, res) {
    const db = await getDb();
    const { userId } = req.query; // Get userId from query params
    
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    
    const lists = await db.collection('todo').find({ userId }).toArray();
    res.json(lists);
    console.log(lists);
}

export async function createList(req, res) {
    const db = await getDb();
    const { userId, todos, date } = req.body;
    
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    
    const list = await db.collection('todo').insertOne({
        userId,
        todos,
        date,
        createdAt: new Date()
    });
    res.json(list);
    console.log(list);
}

export async function getListByDate(req, res) {
    const db = await getDb();
    const { userId } = req.query; // Get userId from query params
    
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    
    const lists = await db.collection('todo').find({
        date: req.params.date,
        userId
    }).toArray();
    res.json(lists);
    console.log(lists);
}

export async function updateList(req, res) {
    const db = await getDb();
    const { userId } = req.body;
    
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    
    const result = await db.collection('todo').updateOne(
        { _id: new ObjectId(req.params.id), userId },
        { $set: req.body }
    );
    res.json(result);
}

export async function deleteList(req, res) {
    const db = await getDb();
    const { userId } = req.query;
    
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    
    const result = await db.collection('todo').deleteOne({
        _id: new ObjectId(req.params.id),
        userId
    });
    res.json(result);
}