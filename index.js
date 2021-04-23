const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const fetchSimilarCollegesRouter = require('./routes/fetchSimilarColleges');
const fetchCollegeDetailsRouter = require('./routes/fetchCollegeDetails');
const fetchStatsRouter = require('./routes/fetchStats');

//database connection
const database_uri = `${process.env.URL}`;
mongoose.connect(database_uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connection established successfully");
});

const port = process.env.PORT || 8080

app.get('/', async (req, res)=> {
    res.json("GET working!!")
})

// routers for various tasks
app.use('/fetchSimilarColleges', fetchSimilarCollegesRouter);
app.use('/fetchCollegeDetails', fetchCollegeDetailsRouter);
app.use('/fetchStats', fetchStatsRouter);

//serve the API
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
