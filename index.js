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
const fetchSimilarCollegesRouter = require('./routes/fetchSimilarColleges');
const fetchCollegeDetailsRouter = require('./routes/fetchCollegeDetails');
const fetchStatsRouter = require('./routes/fetchStats');

const database_uri = "mongodb://127.0.0.1:27017/AssignmentDatabase";
mongoose.connect(database_uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connection established successfully");
});

// const newdb = "mongodb+srv://vaibhavmongo:vaibhavmongo@cluster0.oq6m6.mongodb.net/AssignmentDatabase"
// mongoose.connect(newdb, { useNewUrlParser: true, useCreateIndex: true});
// connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("Database1 connection established successfully");
//     connection.close();
// });

const port = process.env.PORT || 8080

app.get('/', async (req, res)=> {
    res.json("GET working!!")
})

app.use('/addCollegeData', addCollegeDataRouter);
app.use('/addStudentData', addStudentDataRouter);
app.use('/fetchSimilarColleges', fetchSimilarCollegesRouter);
app.use('/fetchCollegeDetails', fetchCollegeDetailsRouter);
app.use('/fetchStats', fetchStatsRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
