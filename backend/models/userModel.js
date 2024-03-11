const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique : true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default: "https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg",
    },
  },
  {
    timestamp: true,
  }
);
// a way to create methods
userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// before the document of this model is saved to the database, this middleware function will be executed.
userModel.pre("save", async function( next){
  // If the document has not been modified, this calls the next() function
  if(!this.isModified){
    next();
  }
  // Generates a salt for hashing passwords using the bcrypt library. 10 rounds
  const salt = await bcrypt.genSalt(10);
  // generate encrypted hash of the password
  this.password = await bcrypt.hash(this.password, salt);
})


const User = mongoose.model("User",userModel);
module.exports = User;
