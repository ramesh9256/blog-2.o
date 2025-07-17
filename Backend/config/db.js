const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
        
    } catch (error) {
        console.log('Error in connecting to database ' , error);
        
    }
}

module.exports = connectDb;