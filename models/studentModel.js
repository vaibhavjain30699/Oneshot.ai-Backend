const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Year_of_batch: {
        type: String,
        required: true
    },
    College_id: {
        type: String,
        required: true
    },
    Skills: {
        type: Array,
        required: true
    }
});

const student = mongoose.model("Student", StudentSchema, "Student");
module.exports = student;
