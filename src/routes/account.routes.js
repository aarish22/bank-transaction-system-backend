// account.routes.js

const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const accountController = require('../controllers/account.controller');


const router = express.Router();

/**
 * - POST /api/accounts/create
 * - @access Private
 * - @description This route allows authenticated users to create a new bank account. The request body should include the account type (e.g., "savings" or "checking") and an optional initial deposit amount. The route handler will validate the input, create a new account associated with the authenticated user, and return the account details in the response.
 */
router.post("/", authMiddleware.authMiddleware, accountController.createAccountController)


module.exports = router