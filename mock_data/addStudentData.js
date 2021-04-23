const router = require('express').Router();
let StudentModel = require('../models/studentModel');
let CollegeModel = require('../models/collegeModel');

const fs = require('fs');

router.route('/').post((req,res) => {

    const StudentData = new StudentModel({
        // ID: req.body.id,
        Name: req.body.name, 
        Year_of_batch: req.body.year_of_batch, 
        // College_id: req.body.college_id, 
        Skills: req.body.skills,
    });
    studentData.save().then(() => res.json("Student added")).catch(err => res.status(400).json("Error", err));
});

router.route('/addFakeData').patch((req,res) => {
    // const fakeData = [];

    // const names = ["Vaibhav Jain","Abhishek Garain","Ashish Kirti Singh", "Amit Kumar Burman", 
    // "Kalp Varshney", "Aryan Bhardwaj", "Vaibhav Krishan", "Abhishek Upmanyu", "Anubhav Singh Bassi", 
    // "Bhuvam Bam", "Ashish Chanchlani", "Sandeep Jain", "Ayush Mehra", "Vaibhav Pandey", 
    // "Yo Yo Honey Singh", "Apoorva Arora", "Barkha Singh", "Ahsaas Channa", "Revathi Pillai", 
    // "Naveen Polishetty"];

    // const skills = [["C++", "Java", "Python"],["Python", "Android", "ML"],["C++", "JavaScript"],["Java", "Spring"]];
    
    // for(var i=0;i<100;i++)
    // {
    //     fakeData.push({
    //         ID: i,
    //         Name: names[i%20], 
    //         Year_of_batch: (i%4)+1, 
    //         College_id: i%30, 
    //         Skills: skills[i%4], 
    //     });
    // }
    fs.readFile('./studentData.json', 'utf8' , async (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        let studentData = JSON.parse(data);
        var i = 0;
        CollegeModel.find({}, async function(err, result) {
            if(err)
            res.status(400).json(err);
            else
            {
                // console.log(result)
                await studentData.forEach(data => {
                    if(data["Name"]=="")data["Name"]="Alfred"
                    data["College_id"] = result[i%result.length]["_id"];
                    i++;
                })
                // res.status(200).json(similarCollegs);
                // console.log(studentData)
                StudentModel.insertMany(studentData).then(function(){
                    console.log("Data inserted");
                    res.json("Fake Students Added");  
                }).catch(function(error){
                    res.status(400).json(error);     
                });
            }
        });

        
    });
    
});

module.exports = router;