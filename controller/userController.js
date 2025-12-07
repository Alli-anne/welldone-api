import {getDb} from "../database/connect.js";


export async function getUser(req, res) {
    const db = await getDb();
    const user = await db.collection('user').findOne({_id: req.params.id});
    res.json(user);
    console.log(user);
}

export async function getAllUsers(req, res) {
    const db = await getDb();
    const users = await db.collection('user').find().toArray();
    res.json(users);
    console.log(users);
}

export async function createUser(req, res) {
    const db = await getDb();
    const user = await db.collection('user').insertOne(req.body);
    res.json(user);
    console.log(user);
}

export async function updateUser(req, res) {
    const db = await getDb();
    const user = await db.collection('user').updateOne({_id: req.params.id}, {$set: req.body});
    res.json(user);
    console.log(user);
}

export async function deleteUser(req, res) {
    const db = await getDb();
    const user = await db.collection('user').deleteOne({_id: req.params.id});
    res.json(user);
    console.log(user);
}

