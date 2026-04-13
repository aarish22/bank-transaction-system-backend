// user.model.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  email:{
    type: String,
    require:[true, 'Email is required'],
    trime:true,
    lowercase:true,
    unique:[true, 'Email already exists'],
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name:{
    type: String,
    require:[true, 'Name is required'],
    trim:true
  },
  password:{
    type: String,
    require:[true, 'Password is required'],
    minlength:[6, 'Password must be at least 6 characters long'],
    select:false // Exclude password from query results by default
  }
},{ 
  timestamps:true // Automatically add createdAt and updatedAt fields
})

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    return next();
  } 

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash; // Hash the password before saving to the database
  return;
})


userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password in the database
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;