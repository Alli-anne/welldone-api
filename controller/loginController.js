import {getDb} from "../database/connect.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
    try {
        const db = await getDb();
        const { email, password } = req.body;

        // Change 'user' to 'users' to match userController
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Use bcrypt.compare for hashed passwords
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Return safe user info (no password)
        const safeUser = { _id: user._id, email: user.email, username: user.username };
        res.json(safeUser);
        console.log("User logged in:", safeUser);

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
}