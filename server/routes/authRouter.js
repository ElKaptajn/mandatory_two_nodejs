import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";

import db from "../database/connection.js";

router.get("/auth/logout", (req, res) => {
    req.session.destroy(() => {
        res.status(200).send({ message: "Logout successful" });
    });
});

router.post("/auth/login", async (req, res) => {
    console.log("Received a POST request to /auth/login");
    try {
        const row = await db.get("SELECT * FROM users WHERE username = ?", [req.body.username]);
        if (!row) {
            return res.status(404).send("No user found.");
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, row.password);
        if (!isPasswordValid) return res.status(401).send("Incorrect password.");
        req.session.user = row.username;
        req.session.role = row.role;
        res.status(200).send({ id: row.id, username: row.username, role: row.role });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error during password comparison.");
    }
});




export default router;