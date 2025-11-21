require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectdb = require('./config/db')

connectdb();

const app = express();
app.use(express.json())


cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'DELTE', 'PUT'],
    allowedHeaders: ["Content-Type", "Authorization"],
});

// routes configuration
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({
        success: false,
        message: 'Something went wrong'
    })
    
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})




