import { getDb } from "../database/connect.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";


// --------------------------------------
// Get ONE user by ID
// --------------------------------------
export async function getUser(req, res) {
    try {
        const db = await getDb();
        const user = await db.collection("user").findOne({
            _id: new ObjectId(req.params.id),
        });

        res.json(user);
        console.log("Fetched user:", user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

// --------------------------------------
// Get ALL users
// --------------------------------------
export async function getAllUsers(req, res) {
    try {
        const db = await getDb();
        const users = await db.collection("users").find().toArray();

        res.json(users);
        console.log("Fetched all users:", users);
    } catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

// --------------------------------------
// Create a new user
// --------------------------------------
export async function createUser(req, res) {
    try {
        const db = await getDb();
        const { email, password, username } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.collection("users").insertOne({
            email,
            username,
            password: hashedPassword
        });

        res.json(result);
        console.log("User created:", result);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Failed to create user" });
    }
}

// --------------------------------------
// Update user by ID
// --------------------------------------
export async function updateUser(req, res) {
    try {
        const db = await getDb();
        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.json(result);
        console.log("User updated:", result);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Failed to update user" });
    }
}

// --------------------------------------
// Delete user by ID
// --------------------------------------
export async function deleteUser(req, res) {
    try {
        const db = await getDb();
        const result = await db.collection("users").deleteOne({
            _id: new ObjectId(req.params.id),
        });

        res.json(result);
        console.log("User deleted:", result);
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Failed to delete user" });
    }
}
