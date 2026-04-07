const {Router} = require('express');
const authMiddleware = require('../middlewares/auth.middleware')

const transactionRoutes = Router();


transactionRoutes.post("/")

module.exports = transactionRoutes;