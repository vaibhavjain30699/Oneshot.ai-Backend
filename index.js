const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 8080

app.get('/', (req, res)=> {
    res.json("GET working!!")
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
