const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');


const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRouter);

module.exports = app;