const router = require('express').Router();
let CollegeModel = require('../models/collegeModel');

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
                    collegeDetails = data;
            })
        }
    });
    // console.log(collegeDetails);
    await CollegeModel.find({}, async function(err, result) {
        if(err)
        res.status(400).json(err);
        else
        {
            let similarColleges = [];
            // console.log(result)
            await result.forEach(data => {
                console.log(data);
                if(data.State === collegeDetails.State && Math.abs(data.No_of_Students-collegeDetails.No_of_Students)<=100 && (data["Courses"].filter(value => collegeDetails["Courses"].includes(value))).length)
                {similarColleges.push(data);console.log(data);}
            })
            // console.log(similarColleges)
            await res.status(200).json(similarColleges);
        }
    });
});


module.exports = router;