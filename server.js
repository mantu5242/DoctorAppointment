const express = require("express")
const colors = require("colors")
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDB = require("./config/db");

//dotenv config
dotenv.config();

//mongodb connection
connectDB();
// rest object
const app = express();


// middlewares
app.use(express.json())
app.use(morgan('dev'))


// routes
app.post('api/v1/user', require('./routes/userRoutes'));
// app.use((req,res) =>{
//     res.send("hello");
// })


// listen
// const port = process.env.PORT || 8000

app.listen(8000,() => {
    console.log("server is running on port 3000")
})