const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb');

const CollegeModel = require('./models/collegeModel');

const app = express();

app.use(express.json());
app.use(cors());

const addCollegeDataRouter = require('./routes/addCollegeData');
const addStudentDataRouter = require('./routes/addStudentData');

const database_uri = "mongodb://127.0.0.1:27017/AssignmentDatabase";
mongoose.connect(database_uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connection established successfully");
});

const port = process.env.PORT || 8080

app.get('/', async (req, res)=> {
    res.json("GET working!!")
})

app.use('/addCollegeData', addCollegeDataRouter);
app.use('/addStudentData', addStudentDataRouter);


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
