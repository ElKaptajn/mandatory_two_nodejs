import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";

import db from "../database/connection.js";

router.get("/users", async (req, res) => {
    res.send({ data: await db.all("SELECT * FROM users;")});
});

router.get("/users/:id", async (req, res) => {
    res.send({ data: await db.all("SELECT * FROM users WHERE id = ?;", [req.params.id])});
});

router.post("/users", async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.role) {
        return res.status(400).send({ message: "Missing key in the body" });
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 12);

    const { lastID } = await db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?);", [req.body.name, encryptedPassword, req.body.role]);

    res.send({
        id: lastID,
        name: req.body.username,
        role: req.body.role
    });
});

router.put("/users/:id", async (req, res) => {
    if (!req.body.name || !req.body.password || !req.body.role) {
        return res.status(400).send({ message: "Missing key in the body" });
    }

    const { lastID } = await db.run("UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?;", [req.body.name, req.body.password, req.body.role, req.params.id]);

    res.send({
        id: lastID,
        name: req.body.username,
        role: req.body.role
    });
});

router.delete("/users/:id", async (req, res) => {

    const { lastID } = await db.run("DELETE FROM users WHERE id = ?;", [req.params.id]);

    res.send({
        id: lastID
    });
});


export default router;