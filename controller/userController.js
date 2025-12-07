import {getDb} from "../database/connect.js";


export async function getUser(req, res) {
    const db = await getDb();
    const user = await db.collection('users').findOne({_id: req.params.id});
    res.json(user);
    console.log(user);
}

export async function getAllUsers(req, res) {
    const db = await getDb();
    const users = await db.collection('users').find().toArray();
    res.json(users);
    console.log(users);
}

export async function createUser(req, res) {
    const db = await getDb();
    const user = await db.collection('users').insertOne(req.body);
    res.json(user);
    console.log(user);
}

export async function updateUser(req, res) {
    const db = await getDb();
    const user = await db.collection('users').updateOne({_id: req.params.id}, {$set: req.body});
    res.json(user);
    console.log(user);
}

export async function deleteUser(req, res) {
    const db = await getDb();
    const user = await db.collection('users').deleteOne({_id: req.params.id});
    res.json(user);
    console.log(user);
}

