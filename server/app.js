import dotenv from "dotenv/config";

import express from 'express';
const app = express();

import helmet from "helmet";
app.use(helmet());

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import rateLimit from 'express-rate-limit';
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(apiLimiter);

app.use(express.json());

app.use("/auth", rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 30, 
	standardHeaders: true, 
	legacyHeaders: false,
}));

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  };

  const isAuthurized = (req, res, next) => {
    if (req.session.role === "ROLE_ADMIN") {
        next();
    } else {
        res.status(403).send("Forbidden");
    }
};

// app.use("/users", isAuthenticated);
// app.use("/users/:id", isAuthenticated);
// app.use("/auth/logout", isAuthenticated);
// app.use("/users/:id", isAuthurized);
// app.use("/users", isAuthurized);

import userRouter from "./routes/userRouter.js";
app.use(userRouter);

import authRouter from "./routes/authRouter.js";
app.use(authRouter);

app.get("*", (req, res) => {
    res.send("<h1>404 - Not Found</h1>")
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log("Server is running on port", server.address().port));