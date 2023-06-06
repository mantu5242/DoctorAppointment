const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true })
        // await mongoose.connect('mongodb://127.0.0.1:27017/DoctorApp',{useNewUrlParser: true });
        console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white)
    }
    catch(error){
        console.log(`mongodb server issue ${error}`.bgRed.white)
    }
}

module.exports = connectDB;