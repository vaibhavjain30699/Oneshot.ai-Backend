const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Year_founded: {
        type: Number,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    No_of_Students: {
        type: Number,
        required: true
    },
    Courses: {
        type: Array,
        required: true
    }
});

const college = mongoose.model("College", CollegeSchema, "College");
module.exports = college;
