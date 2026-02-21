// auth.controller.js is responsible for handling the logic related to user authentication, such as user registration and login. It will use the user.model.js to interact with the database and perform operations related to user data.

const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/** 
* user registration controller
* @route POST /api/auth/register
* @access Public  
*/
async function userRegisterConroller(req, res){
  const {email, name, password} = req.body

  const isExists = await userModel.findOne({
    email: email // Check if a user with the provided email already exists in the database
  })
  if(isExists){
    return res.status(400).json({message: "User already exists"});
  }




  const user = await userModel.create({
    email,password, name
  })

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookies("token", token)

  res.status(201).json({
    user:{
      _id:user._id,
      email:user.email,
      name:user.name
    }
  })
}



module.exports = {
  userRegisterConroller
};