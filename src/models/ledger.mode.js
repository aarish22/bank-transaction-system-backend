const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
  account:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Account reference is required for creating a ledger entry"],
    index: true,
    immutable: true
  },

  amount:{
    type:Number,
    required: [true, "Amount is required for creating a ledger entry"],
    immutable: true
  },
  transaction:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "transaction",
    required: [true, "Transaction reference is required for creating a ledger entry"],
    index: true,
    immutable: true
  },
  type:{
    type: String,
    enum:{
      value:["DEBIT","CREDIT"],
      message:"Type must be either DEBIT or CREDIT",
    },
    required: [true, "Type is required for creating a ledger entry"],
    immutable: true
  }
})


function preventDuplicateLedgerEntries() {
  throw new Error("Duplicate ledger entry detected for the same transaction and account");
}

ledgerSchema.pre('findOneAndUpdate', preventDuplicateLedgerEntries);
ledgerSchema.pre('updateOne', preventDuplicateLedgerEntries);
ledgerSchema.pre('deleteOne', preventDuplicateLedgerEntries);
ledgerSchema.pre('remove', preventDuplicateLedgerEntries);
ledgerSchema.pre('deleteMany', preventDuplicateLedgerEntries);


const ledgerModel = mongoose.model("Ledger", ledgerSchema);

module.exports = ledgerModel;