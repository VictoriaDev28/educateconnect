const express = require('express');
const { getAllStudentViewCourses, getStudentViewCourseDetails} = require('../../controllers/student-controller/courseController')

const router = express.Router();

router.get('/get', getAllStudentViewCourses);
router.get('/get/details/:id', getStudentViewCourseDetails);


module.exports = router;

