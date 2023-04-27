import { Router } from "express";
const router = Router();
import nodemailer from "nodemailer";

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

router.get("/auth/email", (req, res) => {
    
    console.log("Hello from email");
  // create a nodemailer transporter object
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elkaptajn.test@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // create a mailOptions object with the necessary information for the email
  const mailOptions = {
    from: 'elkaptajn.test@gmail.com',
    to: 'xeni0103@stud.kea.dk',
    subject: 'Ticket Information',
    text: 'Here is the information for your ticket...'
  };

  // send the email using the transporter.sendMail() function
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
});




export default router;