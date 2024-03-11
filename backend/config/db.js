const mongoose = require("mongoose");


const connectDB = async () => {
    const uri = "mongodb+srv://testuser:test123@cluster0.cojs2sc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);//error
  }
};

module.exports = connectDB;
