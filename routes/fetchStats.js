const router = require('express').Router();
let CollegeModel = require('../models/collegeModel');

router.route('/States').get(async (req,res) => {
    let collegeDetails = {};
    let collegeResult = [];

    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                if(data.State in collegeDetails)
                    collegeDetails[data.State].push(data);
                else
                {
                    collegeDetails[data.State]=[data];
                }
            })
            console.log(collegeDetails);

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

router.route('/Courses').get(async (req,res) => {
    let subjectDetails = {};
    let subjectResult = [];

    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                data.Courses.forEach(subject => {
                    if(subject in subjectDetails)
                    subjectDetails[subject].push(data);
                    else
                    {
                        subjectDetails[subject]=[data];
                    }
                })
            })
            console.log(subjectDetails);

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