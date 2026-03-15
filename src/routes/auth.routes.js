// auth.routes.js is responsible for handling the routes related to authentication, such as user registration and login. It will use the auth.controller.js to handle the logic for these routes.

const express = require('express');
const authController = require('../controllers/auth.controller');


const router = express.Router()


/* POST /api/auth/register */
router.post("/register",authController.userRegisterConroller);

/* POST /api/auth/login */
router.post("/login", authController.userLoginController);


module.exports = router;