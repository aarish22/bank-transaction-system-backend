const accountModel = require('../models/account.model');

async function createAccount(req, res){
  const { accountType, initialDeposit } = req.body;
  const userId = req.user._id; // Get the authenticated user's ID from the request object 
}