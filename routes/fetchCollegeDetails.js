const router = require('express').Router();
let CollegeModel = require('../models/collegeModel');
let studentModel = require('../models/studentModel');

// fetches details of a college based on a college ID
router.route('/byID').post(async (req,res) => {
    let CollegeID = req.body.id;
    let collegeDetails = {};
    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                // compare college ID of each data with given college id
                if(data._id == CollegeID)
                    collegeDetails = data;
            })
        }
    res.status(200).json(collegeDetails);
    });
});

// fetches students of a college based on a college ID
router.route('/students').post(async (req,res) => {
    let CollegeID = req.body.id;
    let studentsOfCollege = [];
    await studentModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                // push data of students if student's collegeID matches given college ID
                if(data.College_id == CollegeID)
                    studentsOfCollege.push(data);
            })
        }
    });
    res.status(200).json(studentsOfCollege);
});

// fetches all colleges in the form of {collegeID,collegeName}
router.route('/allColleges').post(async (req,res) => {
    let colleges = [];
    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                colleges.push({name: data.Name, id: data.id});
            })
        }
    });
    res.status(200).json(colleges);
});

module.exports = router;