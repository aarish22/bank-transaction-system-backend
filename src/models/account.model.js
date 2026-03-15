const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: [true, "User reference is required"], // Ensure that the user field is required
    index: true // Create an index on the user field for faster queries
  },
  status: {
    type: String,
    enum: {
      values: ["active", "inactive", "suspended"], // Define the allowed values for the status field
      message: "Status must be either active, inactive, or suspended" ,// Custom error message for invalid status values
      
    },
    default: "active" // Set the default value for the status field to "active"
  }, 
    currency: {
      type: String,
      required: [true, "Currency is required"] ,// Ensure that the currency field is required  
      default: "INR" // Set the default value for the currency field to "INR"
    }
  },
    {
      timestamps: true // Automatically add createdAt and updatedAt fields to the schema
  }
)

accountSchema.index({ user: 1 , status: 1}) // create a compound index on the user and status fields for faster queries that filter by both fields
const accountModel = mongoose.model("Account", accountSchema)

module.exports = accountModel;
