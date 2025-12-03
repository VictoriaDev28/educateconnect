require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectdb = require('./config/db');
const authRoutes = require('./routes/auth-routes/auth');
const mediaRoutes = require('./routes/instructor-routes/mediaRoutes');
const instructorCourseRoutes = require('./routes/instructor-routes/courseRoute');
const studentViewCourseRoutes = require('./routes/student-routes/courseRoute')


connectdb();

const app = express();
app.use(express.json())


app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// routes configuration

app.use("/auth" , authRoutes)
app.use("/media", mediaRoutes)
app.use("/instructor/course", instructorCourseRoutes)
app.use("/student/course", studentViewCourseRoutes)


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