const mongoose = require("mongoose");

// Connecting Wih DB
const connectBD = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('Database Eror:',error);
    process.exit(1);
  }
};

// Exporting
module.exports = connectBD;
