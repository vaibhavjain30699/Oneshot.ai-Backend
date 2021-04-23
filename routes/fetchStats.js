const router = require('express').Router();
let CollegeModel = require('../models/collegeModel');

// fetches statistics of colleges based on states
router.route('/States').post(async (req,res) => {
    let collegeDetails = {};
    let collegeResult = [];

    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                // store college details in a HashMap object where key -> state name, value -> array of colleges
                if(data.State in collegeDetails)
                    collegeDetails[data.State].push(data);
                else
                {
                    collegeDetails[data.State]=[data]; 
                }
            })

            // traversing the object and creating a custom object to formulate pie chart
            for await (const [key, val] of Object.entries(collegeDetails)) {
                collegeResult.push(
                    {
                        "title": key,
                        "colleges": val
                    }
                )
            };
            res.status(200).json(collegeResult);
        }
    });
});


// fetches statistics of colleges based on courses offered
router.route('/Courses').post(async (req,res) => {
    let subjectDetails = {};
    let subjectResult = [];

    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                // store college details in a HashMap object where key -> course name, value -> array of colleges
                data.Courses.forEach(subject => {
                    if(subject in subjectDetails)
                    subjectDetails[subject].push(data);
                    else
                    {
                        subjectDetails[subject]=[data];
                    }
                })
            })

            // traversing the object and creating a custom object to formulate pie chart
            for await (const [key, val] of Object.entries(subjectDetails)) {
                subjectResult.push(
                    {
                        "title": key,
                        "colleges": val
                    }
                )
            };
            res.status(200).json(subjectResult);
        }
    });
});

module.exports = router;