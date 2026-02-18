// auth.routes.js is responsible for handling the routes related to authentication, such as user registration and login. It will use the auth.controller.js to handle the logic for these routes.

const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router()



router.post("/register",authController.userRegisterConroller);


module.exports = router;