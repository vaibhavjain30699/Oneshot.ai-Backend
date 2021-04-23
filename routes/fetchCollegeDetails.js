const router = require('express').Router();
let CollegeModel = require('../models/collegeModel');
let studentModel = require('../models/studentModel');

router.route('/byID').post(async (req,res) => {
    let CollegeID = req.body.id;
    let collegeDetails = {};
    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                
                if(data._id == CollegeID)
                    collegeDetails = data;
            })
        }
    res.status(200).json(collegeDetails);
    });
});

router.route('/students').post(async (req,res) => {
    let CollegeID = req.body.id;
    let studentsOfCollege = [];
    await studentModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                
                if(data.College_id == CollegeID)
                    studentsOfCollege.push(data);
            })
        }
    });
    // console.log(studentsOfCollege);
    res.status(200).json(studentsOfCollege);
});

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
    // console.log(colleges);
    res.status(200).json(colleges);
});

module.exports = router;