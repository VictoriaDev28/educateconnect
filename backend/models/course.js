const mongoose = require('mongoose')

const LectureSchema = new mongoose.Schema({
    title: {type: String},
    videoUrl: {type: String},
    public_id: {type: String},
    freePreview: {type: Boolean}
});

const courseSchema = new mongoose.Schema({
    instructorId: {type: String},
    instructorName: {type: String},
    date: {type: Date},
    title: {type: String},
    category: {type: String},
    level: {type: String},
    primaryLanguage: {type: String},
    language: {typea: String},
    subtitle: {typea: String},
    description: {type: String},
    objectives: {type: String},
    image: {type: String},
    welcomeMessage: {type: String},
    pricing: Number,
    students: [
        {
            studentId: String,
            studentName: String,
            studentEmail: String,
        }
    ],

    curriculum: [LectureSchema],
    isPublished: {type: Boolean}

    
});

module.exports = mongoose.model("Course", courseSchema)