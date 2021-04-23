const router = require('express').Router();
let CollegeModel = require('../models/collegeModel');

router.route('/').get(async (req,res) => {
    let CollegeID = req.body.id;
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
    // collegeDetails.forEach((key, val)=>{
    
    
    // await CollegeModel.find({}, async function(err, result) {
    //     if(err)
    //     res.status(400).json(err);
    //     else
    //     {
    //         let similarColleges = [];

    //         await result.forEach(data => {
    //             if(data.State === collegeDetails.State && Math.abs(data.No_of_Students-collegeDetails.No_of_Students)<=100 && (data["Courses"].filter(value => collegeDetails["Courses"].includes(value))).length)
    //             similarColleges.push(data);
    //         })
    //         res.status(200).json(similarColleges);
    //     }
    // });
});


module.exports = router;