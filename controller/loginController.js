import {getDb} from "../database/connect.js";

export async function login(req, res) {
    const db = await getDb();
    const user = await db.collection('users').findOne({email: req.body.email});
    res.json(user);
    console.log(user);
}

