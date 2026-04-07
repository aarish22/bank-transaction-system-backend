const mongoose = require('mongoose');
const { isValidElement } = require('react');

const transactionSchema = new mongoose.Schema({
fromAccount:{
  type: mongoose.Schema.Types.ObjectId, // Reference to the TransactionType model
  ref: "Account",
  required: [true, "Transaction type reference is required"], // Ensure that the type field is required
  index: true // Create an index on the type field for faster queries
},
toAccount:{
  type: mongoose.Schema.Types.ObjectId, // Reference to the Account model
  ref: "Account",
  required: [true, "To account reference is required"], // Ensure that the toAccount field is required
  index: true // Create an index on the toAccount field for faster queries
},
status:{
  type: String,
  enum:{
    value:["PENDING","COMPLTED","FAILED","REVERSED"],
    message:"Status must be either PENDING, COMPLETED, or FAILED"
   },
   default:"PENDING"
},
amount:{
  type: Number,
  required: [true, "Amount is required for creating a transaction"],
  min: [0, "Amount must be a positive number"] // Ensure that the amount is a positive number
  },
idempotencyKey:{
  type:String,
  required:[true,"Idempotency key is required for creating a transaction"],
  index:true,
  unique:true
}
},{
  timestamps:true
})