import {getDb} from "../database/connect.js";
import bcrypt from 'bcrypt';

export async function login(req, res) {
    const db = await getDb();
    const user = await db.collection('users').findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    // Return user info (no need to hide password in dev)
    res.json(user);
}
