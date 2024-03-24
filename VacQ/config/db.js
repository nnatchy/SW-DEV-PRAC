const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.set('strictQuery', true); // strictQuery is for ensuring the queries adhere strictly to the schema definition.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;