const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: [true, "User reference is required"] // Ensure that the user field is required
  },
  status: {
    enum: {
      values: ["active", "inactive", "suspended"], // Define the allowed values for the status field
      message: "Status must be either active, inactive, or suspended" // Custom error message for invalid status values
    }
  }, 
    currency: {
      type: String,
      required: [true, "Currency is required"] ,// Ensure that the currency field is required  
      default: "USD" // Set the default value for the currency field to "USD"
    }
  },
    {
      timestamps: true // Automatically add createdAt and updatedAt fields to the schema
  }
)

const accountModel = mongoose.model("Account", accountSchema)

module.exports = accountModel;
