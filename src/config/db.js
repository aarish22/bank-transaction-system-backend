const mongoose = require('mongoose');


const connectToDB = () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{  // mongoose.connect() returns a promise, so we can use .then() to handle the successful connection and .catch() to handle any errors that occur during the connection process.
    console.log('Connected to MongoDB');
  })
  .catch((error)=>{
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with a failure code
  });
}

module.exports = connectToDB;