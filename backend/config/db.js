const mongoose = require('mongoose')
require('dotenv').config();

const connectdb= async () => {
    try{
    await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB is Connected!");
    } catch (error){
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectdb;