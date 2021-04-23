const router = require('express').Router();
let CollegeModel = require('../models/collegeModel');

// used to fetch similar colleges based on a college ID
router.route('/').post(async (req,res) => {
    let CollegeID = req.body.id;

    let collegeDetails = {};

    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            await result.forEach(data => {
                
                if(data._id == CollegeID)
                    collegeDetails = data; //store college details
            })
        }
    });

    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            let similarColleges = [];
            await result.forEach(data => {
                // check all college details with current college based on given conditions
                if(data.State === collegeDetails.State && Math.abs(data.No_of_Students-collegeDetails.No_of_Students)<=100 && (data["Courses"].filter(value => collegeDetails["Courses"].includes(value))).length)
                similarColleges.push(data);
            })
            await res.status(200).json(similarColleges);
        }
    });
});

module.exports = router;