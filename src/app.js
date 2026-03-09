const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

/**
 * - Importing Routes
 */
const authRouter = require('./routes/auth.routes');
const accountRouter = require('./routes/account.routes');
/**
 * - API Routes
 */

app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)

module.exports = app;